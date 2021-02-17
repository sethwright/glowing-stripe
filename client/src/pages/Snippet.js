export default function Snippets(props) {
    const { title } = props.match.params;

    return <div>{title}</div>
}