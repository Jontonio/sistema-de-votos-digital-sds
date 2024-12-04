
export const HeaderData = () => {

    const year = new Date().getFullYear()

    return (
        <div className="content-header-data border-round">
            <h2>ELECCIONES ESCOLARES - {year}</h2>
        </div>
    )
}
