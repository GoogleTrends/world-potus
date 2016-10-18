import { scaleLinear, scalePow } from 'd3-scale'
import { extent, histogram } from 'd3-array'
import { groupBy, maxBy } from 'lodash'
import { COORDS } from '../constants'
import { sum } from './vectors'

const RADIUS_FACTORS = {CONTINENTS: 1 / 5.9, COUNTRIES: 1 / 8}

function isMainGeoData(geoData, mainGeoDatum, usDataEnabled) {
  return usDataEnabled ? geoData.geoCode === 'USA' : geoData.geoCode === mainGeoDatum.geoCode
}

function circle(radius, angle) {
  return [
    radius * Math.sin(angle),
    radius * Math.cos(angle),
  ]
}

function partitionRange([min, max], parts) {
  const binWidth = (max - min) / parts
  return Array(parts).fill(null).map((_, i) => min + i * binWidth)
}

function initNode(geoDatum, mainGeoDatum, usDataEnabled) {
  return {
    radius: 0,
    position: [0.5, 0.5],

    targetRadius: 0,
    targetPosition: [0.5, 0.5],

    isMain: usDataEnabled ? geoDatum.geoCode === 'USA' : geoDatum.geoCode === mainGeoDatum.geoCode,
    main: geoDatum.continentGeoCode || "USA",

    code: geoDatum.geoCode,
    label: geoDatum.geoCode,
    color: geoDatum.color,
    stop: false,
  }
}

export function updateNode(node, geoDatum, updater) {
  node.targetRadius = updater.radius(geoDatum)
  node.targetPosition = updater.position(geoDatum)
  node.isMain = updater.isMain ? updater.isMain(geoDatum) : false
  node.stop = false
}

export function exitNode(node) {
  node.targetRadius = 0
  node.targetPosition = [0.5, 0.5]
  node.stop = false
}

function makeRadiusScale(geoType) {
  const radiusMaxPossible = RADIUS_FACTORS[geoType]
  const radiusScale = scaleLinear().domain([0, 100]).range([0, radiusMaxPossible])
  return radiusScale
}

const updaters = {
  BLOB(geoDataList, geoType, usDataEnabled) {
    const mainGeoDatum = maxBy(geoDataList, 'value')
    const radiusScale = makeRadiusScale(geoType)
    let blobIndex = 0
    const visibleSecondaryNodesCount = geoDataList.filter(d => d.value > 0 && !isMainGeoData(d, mainGeoDatum, usDataEnabled)).length
    const blobPosSector = 2 * Math.PI / visibleSecondaryNodesCount

    const mainGeoData = geoDataList.find((geoData) => isMainGeoData(geoData, mainGeoDatum, usDataEnabled)) || {value: 0}
    const getDiffWithMain = (geoData) => Math.abs(geoData.value - mainGeoData.value)
    const diffsWithMain = geoDataList.filter(g => !isMainGeoData(g, mainGeoDatum, usDataEnabled)).map(getDiffWithMain)
    const distMax = mainGeoData.value / 2
    const distScale = scalePow().domain(extent(diffsWithMain)).range([0, distMax])

    return {
      radius(geoData) {
        return radiusScale(geoData.value)
      },
      position(geoData) {
        const isCountry = Boolean(geoData.continentGeoCode)
        if (isCountry) return geoData.blobPosition

        if (isMainGeoData(geoData, mainGeoDatum, usDataEnabled)) return [0.5, 0.5]
        if (geoData.value <= 0) return [0.5, 0.5]
        const tangentialDistance = mainGeoData.value + geoData.value
        const additionalDistance = distScale(getDiffWithMain(geoData))
        const posRadius = Math.max(0.1, radiusScale(tangentialDistance + additionalDistance))
        const posAngle = blobIndex * blobPosSector + Math.PI / 4
        const position = circle(posRadius, posAngle)::sum([0.5, 0.5])
        blobIndex++
        return position
      },
      isMain(geoData) {
        const isCountry = Boolean(geoData.continentGeoCode)
        if (isCountry) return false
        return isMainGeoData(geoData, mainGeoDatum, usDataEnabled)
      },
    }
  },
  ATLAS(geoDataList, geoType) {
    const radiusScale = makeRadiusScale(geoType)
    const isCountry = Boolean(geoDataList.length && geoDataList[0].continentGeoCode) // FIXME?
    const geoDataByContinent = isCountry ? groupBy(geoDataList, 'continentGeoCode') : null

    return {
      radius(geoData) {
        return radiusScale(geoData.value)
      },
      position(geoData) {
        const isCountry = Boolean(geoData.continentGeoCode)
        if (!isCountry) return COORDS[geoData.geoCode]

        let position
        if (geoData.geoCode === 'CA') {
          position = COORDS['NAME']
        } else if (geoData.geoCode === 'MX' ||
          geoData.geoCode === 'CU' ||
          geoData.geoCode === 'GT' ||
          geoData.geoCode === 'HN' ||
          geoData.geoCode === 'NI' ||
          geoData.geoCode === 'CR' ||
          geoData.geoCode === 'PA' ||
          geoData.geoCode === 'BZ' ||
          geoData.geoCode === 'SV' ||
          geoData.geoCode === 'BS' ||
          geoData.geoCode === 'TC' ||
          geoData.geoCode === 'HT' ||
          geoData.geoCode === 'DO' ||
          geoData.geoCode === 'JM' ||
          geoData.geoCode === 'KY') {
          position = COORDS['CAME']
        } else {
          position = COORDS[geoData.continentGeoCode]
        }
        if (geoData.continentRelatedIndex === 0) return position

        const centralGeoData = geoDataByContinent[geoData.continentGeoCode][0]
        const continentLength = geoDataByContinent[geoData.continentGeoCode].length - 1
        const sector = 2 * Math.PI / continentLength
        const posAngle = geoData.continentRelatedIndex * sector + Math.PI / 4
        const posRadius = Math.max(0.05, this.radius(geoData) + this.radius(centralGeoData) - 0.03)
        const finalPosition = circle(posRadius, posAngle)::sum(position)

        return finalPosition
      },
    }
  },
  DROPS(geoDataList, geoType) {
    const radiusScale = makeRadiusScale(geoType)
    const getRadius = (geoDatum) => radiusScale(geoDatum.value)

    const getSymmetricDomain = (values) => {
      const max = Math.max(...values.map(item => Math.abs(item))) + 1
      return [-max, +max]
    }

    const yAccessor = geoData => geoData.historicValue - geoData.value || 0
    const yValues = geoDataList.map(yAccessor)
    const yDomain = getSymmetricDomain(yValues)

    const radiuses = geoDataList.map(geoData => getRadius(geoData))
    const extentRadiuses = extent(radiuses)
    const maxRadius = extentRadiuses[1]
    const yScale = scaleLinear()
      .domain(yDomain)
      .range([0 + maxRadius, 1 - maxRadius])

    const histo = histogram()
      .domain(yScale.domain())
      .thresholds(partitionRange(yScale.domain(), 8))
      .value(yAccessor)
    const bins = histo(geoDataList)

    const xAccessor = (geoData) => {
      if (geoData.value === 0) return 1
      const bin = bins.find(bin => bin.includes(geoData)).filter(d => d.value > 0)

      const nth = bin.indexOf(geoData) + 1
      const len = bin.length
      return nth / (len + 1)
    }

    const xScale = scaleLinear()
      .domain([0, 1])
      .range([0 + maxRadius, 1 - maxRadius])

    return {
      radius: getRadius,
      position(geoData) {
        return [xScale(xAccessor(geoData)), yScale(yAccessor(geoData))]
      },
    }
  },
}

function makeUpdater(geoDataList, vizType, geoType, usDataEnabled) {
  return updaters[vizType](geoDataList, geoType, usDataEnabled)
}

export function updateNodes(nodes, geoDataList, vizType = 'BLOB', {expanded}, usDataEnabled) {
  const geoType = expanded ? 'COUNTRIES' : 'CONTINENTS'
  const updater = makeUpdater(geoDataList, vizType, geoType, usDataEnabled)

  nodes.forEach(node => {
    // Reset main nodes
    node.isMain = false

    // EXIT
    if (!geoDataList.find(geoDatum => node.code === geoDatum.geoCode)) {
      exitNode(node)
    }
  })

  const mainGeoDatum = maxBy(geoDataList, 'value')

  geoDataList.forEach(geoDatum => {
    let node = nodes.find(node => node.code === geoDatum.geoCode)
    // ENTER
    if (!node) {
      node = initNode(geoDatum, mainGeoDatum, usDataEnabled)
      nodes.push(node)
    }
    // UPDATE
    updateNode(node, geoDatum, updater)
  })
}
