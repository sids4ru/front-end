
import InfiniteScroll from "./infiniteScroll";
import ImageList from "./imageList";
import Debounce from "./debounce"
import SearchTable from "./searchTable"
import FormBuilder from "./formbuilder";
import Form from "../form";
import VirtualizedUserList from "./imageList"
export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      
      {/* <h1>Core JavaScript Practice</h1> */}
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
      {/* <FormBuilder></FormBuilder> */}
      {/* <InfiniteScroll></InfiniteScroll> */}
      <VirtualizedUserList />
    </div>
  );
}