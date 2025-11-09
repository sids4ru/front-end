// import FormFeild from "./formFeild";
import { useState } from "react";
import InfiniteScroll from "./infiniteScroll";
import ImageList from "./imageList";
import Debounce from "./debounce"
import SearchTable from "./searchTable"
import FormBuilder from "./formbuilder";

export default function App() {
 const builder = [
  { "label": "Name", "type": "text", "required": true },
  { "label": "Age", "type": "number" },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
{ "label": "Name", "type": "text", "required": true },
  { "label": "Age", "type": "number" },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] }
]
  let f1 = { "label": "Name", "type": "text", "required": true };
  let f2 = { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] }
  const [feildVal, setFeildVal] = useState("")
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      
      <h1>Core JavaScript Practice</h1>
      <p>Day 1: Scope, Closures, Hoisting, Event Loop, and “this”</p>
      {/* <FormBuilder feilds={builder}></FormBuilder> */}
      {/* <FormFeild 
      key={f2.label} 
      value={feildVal}
      feild={ {label: f2.label, type: f2.type, options: f2.options} }
      onChange={(val) => setFeildVal(val)}
      ></FormFeild><br/> */}
      {/* <InfiniteScroll></InfiniteScroll> */}
      {/* <ImageList></ImageList> */}
      {/* <Debounce></Debounce> */}
      {/* <SearchTable></SearchTable> */}
      <FormBuilder></FormBuilder>
    </div>
  );
}