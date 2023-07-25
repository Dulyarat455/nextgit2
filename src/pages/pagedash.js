import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Navbar from '@/components/Navbar';

const DashboardComponent = () => {


    const chartRef = useRef(null);
    let chartInstance = null;
    const chartRefA = useRef(null);
    let chartInstanceA = null;

    const tzOffset = 7; // Offset for Indochina Time (GMT+7)
const dateNow = new Date(Date.now() + tzOffset * 3600000);

const monthName = dateNow.toLocaleString('en-US', { month: 'long' });
const year = dateNow.toLocaleString('en-US', { year: 'numeric' });
const [token,setToken] = useState('')
const [balanceMonth, setBalanceMonth] = useState({
  income: 0,
  expenses: 0
}
)
const [balanceYear,setBalanceYear] = useState({
  income: 0,
  expenses: 0
})







useEffect(() => {
  const token = localStorage.getItem("token");
  setToken(token);
 

}, []);



  useEffect(  () => {
    
  


    getCalculateMonth()
    // getCalculateYear()


    

   
  }, [token]);



  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [`income : ${balanceMonth.income} bath. ` , `expenses: ${balanceMonth.expenses} bath.`],
        datasets: [{
          data: [ balanceMonth.income, balanceMonth.expenses],
          backgroundColor: [ '#00ff00', '#ff0000'],
        }],
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  
  }, [balanceMonth]);


  useEffect(() => {
    const ctx = chartRefA.current.getContext('2d');
    chartInstanceA = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [`income : ${balanceYear.income} bath. ` , `expenses: ${balanceYear.expenses} bath.`],
        datasets: [{
          data: [ balanceYear.income, balanceYear.expenses],
          backgroundColor: [ '#00ff00', '#ff0000'],
        }],
      },
    });

    return () => {
      if (chartInstanceA) {
        chartInstanceA.destroy();
      }
    };
  
  }, [balanceYear]);





  const getCalculateMonth = async() =>{
    const res = await fetch("http://localhost:3000/api/calculatemonth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
          
      },
     
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
  
            console.log(data.sumbalance)
            setBalanceMonth( data.sumbalance);
            console.log("Month = ",data.sumbalance)
            //  router.reload();
         
        } else {
            console.log(data)
          
        }
      }
      );




      const resyear = await fetch("http://localhost:3000/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
          
      },
     
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
  
            console.log("year = ",data.sumbalance)
            setBalanceYear( data.sumbalance);
            console.log("Year = ",data.sumbalance)
            //  router.reload();
         
        } else {
            console.log(data)
          
        }
      }
      );
  } 
  
  
  // const getCalculateYear = async() =>{
  //   const res = await fetch("http://localhost:3000/api/calculate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": token,
          
  //     },
     
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  
  //           console.log("year = ",data.sumbalance)
  //           setBalanceYear( data.sumbalance);
  //           console.log("Year = ",data.sumbalance)
  //           //  router.reload();
         
  //       } else {
  //           console.log(data)
          
  //       }
  //     }
  //     );
  // } 

  

  return (
    
  
    <div className="bg-gray-200 min-h-screen">
      <Navbar/>
      <div className="flex">
        <div className="bg-white h-screen p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <ul className="space-y-2">
            <li className="text-gray-700">
              <a href="#" className="text-blue-500 hover:underline">Dashboard</a>
            </li>
            <li className="text-gray-700">
              <a href="#" className="text-blue-500 hover:underline">Analytics</a>
            </li>
            <li className="text-gray-700">
              <a href="#" className="text-blue-500 hover:underline">Reports</a>
            </li>
          </ul>
        </div>
       
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
          <div className="bg-white p-6 shadow-md">
            <p className="text-gray-700">Some content goes here...</p>
          </div>
          <br/>
        

<div style={{ display: 'flex' }}>
  <div className="w-64 h-64" style={{ marginRight: '10px' }}>
  <h2 className="text-2xl font-bold mb-4">For {monthName} {year}</h2>
    <canvas ref={chartRef} />
    <br/>
    <p className="text-gray-500">ยอดคงเหลือ: {balanceMonth.income - balanceMonth.expenses} bath.</p>
  </div>
  
  <div className="w-64 h-64">
  <h2 className="text-2xl font-bold mb-4">For  {year}</h2>
    <canvas ref={chartRefA} />
    <br/>
    <p className="text-gray-500">ยอดคงเหลือ: {balanceYear.income - balanceYear.expenses} bath.</p>
  </div>
</div>

         
         
          
        </div>
      </div>

    </div>


    

  );
};

export default DashboardComponent;



