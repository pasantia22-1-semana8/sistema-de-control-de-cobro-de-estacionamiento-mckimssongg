import React from 'react';

function Search({ searchValue , setSearchValue}){
    const onSearchValue = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
    };
    return (
        <input
        placeholder="Busqueda..."
        value={searchValue}
        onChange={onSearchValue}/>
    );
}

export default Search;