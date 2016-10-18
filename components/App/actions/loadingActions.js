export const LOADING = 'LOADING'

const onLoading = () => ({ type: LOADING, loading: true })

const onLoadingDone = () => ({ type: LOADING, loading: false })

export default { onLoading, onLoadingDone }
