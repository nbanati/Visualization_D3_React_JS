import React from 'react';

 const HomePage = (props) => {


    return(
        <div>
            <div> 
                <br/><br/><br/>
                <div style={{width:"80%"}}>
                This project is completed in accordance with the requirements of the course CSE-564 : Visualization at Stony Brook University.<br/>
                The project provides an interactive Visualization of New York Housing Units Data (by buildings) made publically available at NYC OpenData(<a href="https://data.cityofnewyork.us/Housing-Development/Housing-New-York-Units-by-Building/hg8x-zxpr">here</a>) by The Department of Housing Preservation and Development (HPD).<br/><br/>
            
                The dataset contains New Yorks housing data per building for each building project and its related data. The dataset consists of 4,732 Rows and 42 Columns. The data was processed, cleaned to obtain a dataset of 15(+1) useful columns and 1500 randomly sampled rows using a python script.

                The following are the definitions of the attributes in the sampled data:<br/>
                
                    <ul><b>Numeric Variables</b>
                    <li><b><font style={{color:"#2e8083"}}>Extremely Low Income Units</font></b> - Units with rents that are affordable to households earning 0 to 30% of the area median income (AMI).</li>
                    <li><b><font style={{color:"#2e8083"}}>Very Low Income Units </font></b>- Units with rents that are affordable to households earning 31 to 50% of the area median income (AMI).</li>
                    <li><b><font style={{color:"#2e8083"}}>Low Income Units </font></b>– Units with rents that are affordable to households earning 51 to 80% of the median income (AMI).</li>
                    <li><b><font style={{color:"#2e8083"}}>Counted Rental Units </font></b>– Units where assistance has been provided to landlords for affordable units.</li>
                    <li><b><font style={{color:"#2e8083"}}>Counted Homeownership Units </font></b>– Units where assistance has been provided directly to homeowners.</li>
                    <li><b><font style={{color:"#2e8083"}}>Total Counted Units </font></b>- Total number of affordable, regulated units in the building. </li>
                    <li><b><font style={{color:"#2e8083"}}>Total Units </font></b>- The total number of units, affordable and market rate, in each building.</li>

                    </ul>
                    <ul><b>Categorical Variables</b>
                    <li><b><font style={{color:"#2e8083"}}> Program Group </font></b>- The project group/category for a building project</li>
                    <li><b><font style={{color:"#2e8083"}}> Borough </font></b>- The Borough where the building is located.</li>
                    <li><b><font style={{color:"#2e8083"}}> PostCode </font></b>- The ZipCode where the building is located.</li>
                    <li><b><font style={{color:"#2e8083"}}> Council District </font></b>- The NYC Council District where the building is located.</li>
                    <li><b><font style={{color:"#2e8083"}}> Census Tract </font></b> – The 2010 U.S. Census Tract number where the building is located.</li>
                    <li><b><font style={{color:"#2e8083"}}> NTA - Neighborhood Tabulation Area </font></b>– The NYC Neighborhood Tabulation Area number where the building is located.</li>
                    <li><b><font style={{color:"#2e8083"}}> Reporting Construction Type </font></b>– Either a ‘new construction’ or ‘preservation’
                        <ul>
                            <li>‘New construction’ – New affordable housing units are created, or down payment assistance is given to a homeowner to access an affordable home.</li>
                            <li>‘Preservation’ - Existing buildings receive physical rehabilitation and/or financial operating assistance is for existing and future tenants. </li>
                        </ul>
                    </li>
                    <li><b><font style={{color:"#2e8083"}}>Prevailing wage status </font></b>- Whether the project is subject to any prevailing wage requirements, such as Davis Bacon.</li>
                    </ul>
                </div>
            </div>
            <div>Source:<br/> 
                1. DataSet and Rephrased Definitions: https://data.cityofnewyork.us/Housing-Development/Housing-New-York-Units-by-Building/hg8x-zxpr<br/>
                2. Icons : https://icons8.com/icons/
            </div>
        </div>
    );

};
export default HomePage;


