export const useFilter = (
    tools, toolBackup, typeFilter, categoryFilter, nameFilter,
    setTools, setToolBackup, setTypeFilter, setCategoryFilter, setNameFilter,
    setTypeSelect, setCategorySelect, setNameSelect,
    totalSelect, toolSelected, validTotal,
    setTotalSelect, setToolSelected, setValidName, setValidBtn, setValidTotal, setOpenAlert
) => {
    const useTypeFilter = (e) => {
        let filterData = tools.filter((item) => item.type.toLowerCase() === e.target.value)
        setTypeFilter(filterData);
        setCategoryFilter(filterData);
        setTypeSelect(e.target.value);
        setNameFilter(filterData)
    }

    const useCategoryFilter = (e) => {
        setCategorySelect(e.target.value);
        let filterData = typeFilter.filter((item) => item.category.toLowerCase() === e.target.value)
        setNameFilter(filterData);
    }

    const useNameFilter = (e) => {
        setNameSelect(e.target.value);
        let filterData = categoryFilter.filter((item) => item.toolName.toLowerCase() === e.target.value);
        setNameFilter(filterData)
        setValidName(true)
        setValidBtn(true && validTotal)
    }

    const useOnSubmitToolSelected = () => {
        let { id, toolName, type, category, size, imageProfile } = nameFilter[0];
        // เก็บข้อมูลอุปกรณ์ที่เลือก ไปยังตัวแปรใหม่ เพื่อ 
        // 1. ป้องกันผู้ใช้เลือกอุปกรณ์ที่เหมือนกัน เช่น R100K 10 ตัว, R100K 5 ตัว จริงๆแล้วผู้ใช้ควรเลือก R100K 15 ตัว
        // 2. ลบข้อมูลในตัวแปร tools เพื่อป้องกันค่าอุปกรณ์ที่เลือกแล้วมาแสดงใน select tag ซ้ำ แล้วนำค่าที่ลบมาเก็บไว้ในตัวแปร กรณี ผู้ใช้ลบข้อมูลอุปกรณ์ที่เลือกในตัวแปร
        // toolSelected ก็จะนำค่าที่ลบ นำกลับคืนสู่ตัวแปร tools 
        let backupData = [...toolBackup, nameFilter[0]]
        let newtool = tools.filter((tool) => tool.id !== nameFilter[0].id)
        // ลบอุปกรณ์ที่ถูกเลือกไปยังบอร์ด
        setTools(newtool)
        // backup อุปกรณ์ที่ถูกลบ
        setToolBackup(backupData)


        let createNewTool = {
            id,
            toolName,
            type,
            category,
            size,
            imageProfile,
            total: totalSelect
        }

        // reset ค่าใน select component ให้ว่างเปล่าทั้งหมดและเพิ่มค่าใหม่เข้าไป หลังจากกดปุ่มเพิ่มอุปกรณ์
        setTotalSelect("")
        setNameSelect("")
        setCategorySelect("")
        setTypeSelect("")
        setCategoryFilter([])
        setToolSelected([...toolSelected, createNewTool])
        // set แจ้งเตือนข้อผิดพลาดให้หายไป
        setValidBtn(false)
        setValidTotal(false)
        setValidName(false)
    }

    const useDeleteToolSelected = (id) => {
        let findData = toolBackup.find((item) => item.id === id);
        setToolSelected(toolSelected.filter(item => item.id !== id));
        setToolBackup(toolBackup.filter(item => item.id !== id))
        // set ข้อมูลที่ถูกลบกลับไปยังตัวแปรเดิม
        setTools([...tools, findData])
        setTotalSelect("")
        setNameSelect("")
        setCategorySelect("")
        setTypeSelect("")
        // ให้การแจ้งเตือน ข้อผิดพลาด หายไป
        setOpenAlert(false)
    }

    return [useTypeFilter, useCategoryFilter, useNameFilter, useOnSubmitToolSelected, useDeleteToolSelected]
}