module.exports = (
    formState, toolSelected, toolCal,
    setOpenAlert, setValidTool
) => {
    const useOnSubmitCheck = async () => {
        let projectTotal = formState.inputs.total.value;
        // console.log(toolSelected)

        // คำนวนอุปกรณ์ที่ต้องใช้
        let requiredTool = []
        await toolSelected.map((tool) => {
            let sum = Number(tool.total) * projectTotal;
            let newArr = { id: tool.id, toolName: tool.toolName, total: sum }
            requiredTool = [...requiredTool, newArr]
        })

        // คำนวนอุปกรณ์ที่ต้องเหลือ
        let newTotalTool = []
        await requiredTool.map((tool) => {
            let findTool = toolCal.find((item) => item.id === tool.id)
            let sum = Number(findTool.total) - Number(tool.total)
            let newArr = { id: tool.id, toolName: tool.toolName, total: sum }
            newTotalTool = [...newTotalTool, newArr]
        })

        // เก็บค่าอุปกรณ์ที่ขาดโชวหน้าจอ
        let inSufficientTool = []
        newTotalTool.map((item) => {
            if (item.total < 0) {
                inSufficientTool = [...inSufficientTool, item]
            }
        })

        if (inSufficientTool.length > 0) {
            setOpenAlert(true)
            setValidTool(inSufficientTool)

        } else {
            setValidTool(false)
        }
    }

    return [useOnSubmitCheck]
}