function Item({ name, isPacked }) {
    if (isPacked) {
        return <li>{name} ✅</li>
    }
    return <li>{name}</li>

}
export default function PackingList12() {
    return (
        <section>
            <h2>Packing List</h2>
            <ul>
                <Item isPacked={true} name="주방용품" />
                <Item isPacked={true} name="거실용품" />
                <Item isPacked={false} name="안방용품" />
            </ul>
        </section>
    )
}