import { useState } from "react";
import Table from "./Table";
import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";

function SortableTable(props) {
  const [sortOrder, setSortOrder]= useState(null);
  const [sortBy, setSortBy]= useState(null);
  const { config, data } = props;

  const updatedConfig = config.map((column)=>{
    if(!column.sortValue){
      return column;
    }
    return {
      ...column,
      header: ()=> (<th className="cursor-pointer hover:bg-gray-100" onClick={()=> handleClick(column.label)} >
                      <div className="flex items-center">
                        {getIcons(column.label, sortBy, sortOrder)}
                        {column.label}
                      </div>
                    </th>)

    }
  })
  // console.log(updatedConfig)

  const handleClick = (label)=>{
    // console.log(label);
    if(sortBy && sortBy !== label){
      setSortOrder("asc");
      setSortBy(label);
      return;
    }
    if(sortOrder==null){
      setSortOrder("asc");
      setSortBy(label);
      console.log(sortBy, sortOrder)
    } else if(sortOrder ==="asc"){
      setSortOrder("desc")
      setSortBy(label);
      console.log(sortBy, sortOrder)
    } else if(sortOrder === "desc"){
      setSortOrder(null);
      setSortBy(null);
      console.log(sortBy, sortOrder)
    }
    // setSortBy(label);
  }

  let sortedData = data;
  if(sortOrder && sortBy){
    let { sortValue } = config.find((column)=> column.label === sortBy )
    sortedData = [...data].sort((a, b)=>{
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if(typeof valueA ==='string'){
        return valueA.localeCompare(valueB) * reverseOrder;
      }else{
        return (valueA - valueB) * reverseOrder;
      }
    })
  }

  return (
    <>
      <Table {...props} data={sortedData} config={updatedConfig} />
    </>
  )
}

function getIcons(label, sortBy, sortOrder){
  if(label !== sortBy || sortOrder == null){
    return (
      <div>
        <GoArrowSmallUp />
        <GoArrowSmallDown />
      </div>
    )
  }

  if(sortOrder === "desc"){
    return <GoArrowSmallDown />;
  }

  if(sortOrder === "asc"){
    return <GoArrowSmallUp />;
  }
}

export default SortableTable


/*
Calling a sort function on an array modifies the data array which is also a prop. SO dont do that in react. instead copy it
*/