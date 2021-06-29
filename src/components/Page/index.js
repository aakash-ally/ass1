import React, { Component } from "react";
import styles from "./Page.module.css";

class Page extends Component {
    state = 
        {
            // movies: [],
            // searchValue: "",
            // currmovies: []
            activeid : 0,
            data : [],
            searchValue: "",
            details: {},
            odata: []
      };
    
    componentDidMount(){
        console.log("third")
        fetch("https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D")
        .then((res) => res.json())
        .then((res) => {
            // this.setState({movies : res.Search, currmovies : res.Search})
            this.setState({data: res, odata: res})
            console.log(res[0].firstName)
        })
    }
    performsearch = ()=> {
        console.log("SEARCH VALUE IS", this.state.searchValue)
        if(this.state.odata.length){
        const dat = this.state.odata.filter((item)=>{
            return (item.firstName.includes(this.state.searchValue)||item.lastName.includes(this.state.searchValue)||item.email.includes(this.state.searchValue))

        })
        this.setState({data: dat})        
        }
    }
  render() {

    console.log("Second Call");
    console.log(React.version)
    const { data, details, activeid, searchValue} = this.state;
    return (
        <>
        <div id = {styles["page"]}>
            <div id = {styles["search"]}>
         <input    
          id = {styles["search-box"]}
          onChange={(e) => this.setState({ searchValue: e.target.value })}
        />
        </div>
        <button className={styles.search} onClick={this.performsearch}>Search</button>
        
        </div>
        <main>
      <div id = {styles["table-section"]}>
     
        
        <div id = {styles["table-wrapper"]}>
            <div id={styles["table-headers"]}>
                <table>
                    <thead>
                        <tr>
                            <th className="column1">Id</th>
                            <th className="column2">FirstName</th>
                            <th className="column3">LastName</th>
                            <th className="column4">Email</th>
                            <th className="column5">Phone</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div id={styles["table-data"]}>
                    <table>
                        <tbody>
                            {data.length && data.map((item) => (
                                 <tr className={activeid===item.id ? styles.datarowa : styles.datarow} onClick= {() => this.setState({activeid : item.id, details : item})}>
                                 <td className={styles.column1}>{item.id}</td>
                                 <td className={styles.column2}>{item.firstName}</td>
                                 <td className={styles.column3}>{item.lastName}</td>
                                 <td className={styles.column4}>{item.email}</td>
                                 <td className={styles.column5}>{item.phone}</td>
                             </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


        </div>


        <div id={styles["info-wrapper"]}>
            <h1>Details</h1>
            <p>Click on a table item to get detailed information</p>
            <div id={styles["info-content"]}>
                {Object.keys(details).length === 0 ? <h2>No row selected</h2>: 

                    
                
                
                    <div id={styles["info-content"]}>
                        <div><b>User selected:</b> {details.firstName} {details.lastName}</div>
                        <div>
                            <b>Description: </b>
                            <textarea cols="50" rows="5" readonly>
                            {details.description}    
                            </textarea>
                        </div>
                        <div><b>Address:</b> {details.address.streetAddress}</div>
                        <div><b>City:</b> {details.address.city}</div>
                        <div><b>State:</b> {details.address.state}</div>
                        <div><b>Zip:</b> {details.address.zip}</div>
                    </div>
               
                
                }
                {console.log("Selected", details)}
            </div>
        </div>
        
          {/* <div className={styles.topbar}>
                    <h2> Hooked</h2>
                </div>
          <input    
          onChange={(e) => this.setState({ searchValue: e.target.value })}
        />
        <button className={styles.search} onClick={this.performsearch}>Submit</button>
        <div>
        
        {
        currmovies.length && currmovies.map(({ imdbID,Poster,Year,Title })=>(
            <div>
            <img src={Poster} width={200} />
              <h1> 
                {Title}
              </h1>
              <h2>
                {Year}
              </h2>
              <h2>
                {imdbID}
              </h2>    
            </div>
        ))}

        </div> */}

      </div>
      </main>
    </>
    );
  }
}

export default Page;