import React,{useEffect,useState} from "react"

export default function Home() {
  const [test,setTest] = useState([{"ex_sample": ""
  }])

  
  useEffect(() => {

    
 
     
      fetch("/api/test", {
          method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
        
        console.log("data = ",data)
        setTest(data.ans)
        });

      
    
  
  }, []);

  console.log("test = ",test)
  console.log("test[0] = ",test[0].ex_sample)





  return (
    <div>
    <h1>11112222334455</h1>
   {test[0].ex_sample !== '' && (<h1>11111{test[0].ex_sample}</h1>)}
   </div>
  )
}
