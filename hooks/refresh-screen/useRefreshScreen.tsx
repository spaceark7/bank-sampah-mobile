import React from 'react'

interface IRefreshScreen {
  fetch: () => void
  state: {
    isFetching: boolean
    isLoading: boolean
  }
}

const useRefreshScreen = ({
  fetch,
  state: { isFetching, isLoading },
}: IRefreshScreen) => {
  const [refresh, setRefresh] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefresh(true)
    fetch()
    if (!isFetching || !isLoading) {
      setRefresh(false)
    }
  }, [isFetching, isLoading])
  return {
    isRefreshing: refresh,
    onRefresh,
  }
}

export default useRefreshScreen
