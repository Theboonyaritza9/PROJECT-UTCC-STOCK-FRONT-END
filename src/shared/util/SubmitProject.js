import { useHistory } from "react-router-dom";

export const useOnSubmitProject = (
    formState, projectCode, type, file, description, toolSelected, files, validTool
) => {
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        let newProject = {
            projectName: formState.inputs.name.value,
            projectCode: projectCode,
            total: formState.inputs.total.value,
            type: type,
            imageProfile: file,
            description: description,
            tools: toolSelected,
            images: files
        }

        if (!validTool) {
            history.push("/historyproject")
        } else {
            history.push("/boardincomplete")
        }

        console.log(newProject);
    }

    return [onSubmit]
}