

export const getProducts = () => async(dispatch) =>{
    try {
        const DataFromDB = await fetch ('http://localhost:5500/getproducts', {
            method : "GET",
            headers : {
                "Content-type" : "application/json"
            }
        })

        const res = await DataFromDB.json();
        // console.log(res);
        dispatch({type : "SUCCESSFUL_GET_DATA", payload : res});
        
    } catch (error) {
        
        dispatch({type : "FAIL_GET_DATA", payload : error.res});
    }
}