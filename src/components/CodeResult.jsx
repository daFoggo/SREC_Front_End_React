import { useCode } from "../context/CodeContext"

const CodeResult = () => {
    const { totalPoint } = useCode();
    return (
        <div>Hello {totalPoint}</div>
    )
}
export default CodeResult