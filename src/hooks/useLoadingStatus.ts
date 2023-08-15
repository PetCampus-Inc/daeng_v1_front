import { useState } from "react"

const useLoadingStatus = () => {
    const [loadingStatus, setLoadingStatus] = useState("Loading Page...")


    return { loadingStatus, setLoadingStatus }
}

export default useLoadingStatus