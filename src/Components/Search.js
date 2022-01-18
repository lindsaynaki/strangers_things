const Search = ({ searchTerm, setSearchTerm }) => {

    return (
        <div className="search">
            <input className="search-input" placeholder="search posts" value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value)}}>
            </input>
            <button className="search-button" type="submit">Search</button>
        </div>
    )
}

export default Search;