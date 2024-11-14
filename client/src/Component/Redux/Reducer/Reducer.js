const DataArr = [];

export const ReducerData = (state={DataArr}, action) =>{

    switch(action.type){

        case "SUCCESSFUL_GET_DATA" : 
            return {DataArr : action.payload}

        case "FAIL_GET_DATA" :
            return {DataArr : action.payload}

        default : return state
    }
}


