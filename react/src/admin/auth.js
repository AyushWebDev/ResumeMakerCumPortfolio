export const signup=async (emp)=>{
    try{
     const response=await fetch(`http://localhost:8000/emp/`,{ 
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(emp)
    });
    console.log("response: ",response);
    return response.json();
    }catch(e){
        console.log(e);
    }
 }

 export const signin=async (emp)=>{
    try{
     const response=await fetch(`http://localhost:8000/emp/signin`,{ 
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(emp)
    });
    console.log("response: ",response);
    return response.json();
    }catch(e){
        console.log(e);
    }
 }

 export const signout=(next)=>{
    if(typeof window !== "undefined")
        localStorage.removeItem("jwt");
    next();
    return (
        fetch(`http://localhost:8000/user/signout`,{
            method: "GET"
        })
        .then(response=>{
            response.json();
        })
        .catch(error=>{
            console.log(error);
        })
    ); 
};

export const isAuthenticated=()=>{
    if(typeof window !==undefined)
    {
        if(localStorage.getItem("jwt"))
            return JSON.parse(localStorage.getItem("jwt"));
        else 
            return false;
    }
    return false;
};

export const getBasics=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/emp/getBasics/${id}`,{ 
            method: "GET", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" 
            }
        });
        return response.json();
    }catch(e){
        console.log(e);
    }
}

export const addJob=async (data)=>{
    try{
        const response=await fetch(`http://localhost:8000/job/postJob`,{ 
            method: "POST", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }catch(e){
        console.log(e);
    }
}

export const getJob=async (orgid)=>{
    try{
        const response=await fetch(`http://localhost:8000/job/getOrgJob/${orgid}`,{ 
            method: "GET", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" 
            }
        });
        return response.json();
    }catch(e){
        console.log(e);
    }
}

