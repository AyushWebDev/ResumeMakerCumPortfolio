// export const signup=(user)=>{
    
//     return(
//      fetch(`http://localhost:8000/user/`,{ 
//          method: "POST", 
//          headers: {
//              Accept: "application/json",
//              "Content-Type": "application/json" 
//          },
//          body: JSON.stringify(user)
//      }
//      )
//      .then(response=>{
//          return response.json();
//      })
//      .catch(err=>console.log(err))  
//     );
        
    
//  }; 

 export const signup=async (user)=>{
    try{
     const response=await fetch(`http://localhost:8000/user/`,{ 
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    });
    console.log("response: ",response);
    return response.json();
    }catch(e){
        console.log(e);
    }
 }

 export const signin=async (user)=>{
    try{
     const response=await fetch(`http://localhost:8000/user/signin`,{ 
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
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

export const getBasics=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/user/getBasics/${id}`,{ 
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

export const getUser=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/user/${id}`,{ 
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

export const getEdu=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/edu/${id}`,{ 
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

export const addEdu=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/edu/${id}`,{ 
            method: "PUT", 
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

export const delEdu=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/edu/remove/${id}`,{ 
            method: "PUT", 
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

export const getWork=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/work/${id}`,{ 
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

export const addWork=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/work/${id}`,{ 
            method: "PUT", 
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

export const delWork=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/work/remove/${id}`,{ 
            method: "PUT", 
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

export const getAch=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/achievement/${id}`,{ 
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



export const addAch=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/achievement/${id}`,{ 
            method: "PUT", 
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

export const delAch=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/achievement/remove/${id}`,{ 
            method: "PUT", 
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

export const getSkill=async (id)=>{
    try{
        const response=await fetch(`http://localhost:8000/skill/${id}`,{ 
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

export const addSkill=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/skill/${id}`,{ 
            method: "PUT", 
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

export const delSkill=async (id,data)=>{
    try{
        const response=await fetch(`http://localhost:8000/skill/remove/${id}`,{ 
            method: "PUT", 
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
export const getAllJob=async ()=>{
    try{
        const response=await fetch(`http://localhost:8000/job/getAllJob`,{ 
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

export const applyJob=async (orgId,applicantId)=>{
    try{
        const response=await fetch(`http://localhost:8000/job/addApplicant/${orgId}`,{ 
            method: "PUT", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({id: applicantId})
        });
        return response.json();
    }catch(e){
        console.log(e);
    }
}

//export default signup;

