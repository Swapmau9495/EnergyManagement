import React, {  Fragment } from 'react';
import {EuiTabbedContent,EuiSpacer} from '@elastic/eui';
import AssetsLevelTable from '../AssetsTable/AssetsTable';
import FunctionLevelTable from '../FunctionTable/FunctionTable';
const SubNav = ({Refresh,FunctiontabFetchHelper,AssettabFetchHelper,setRefreshdisable}) => {

  //Created Tabs for Function Level Table and Asset Level Table
    const tabs = [
      {
        id: 'FunctionLevel',
        name: <strong>Functions</strong>,
        content: (
          <Fragment>
          <FunctionLevelTable setRefreshdisable={setRefreshdisable} FunctiontabFetchHelper={FunctiontabFetchHelper}  Refresh={Refresh}/>
          </Fragment>
        ),
      },
      // {
      //   id: 'AssetsLevel',
      //   name:<strong>Asset Level</strong>,
      //   content: (
      //     <Fragment>
      //       <AssetsLevelTable setRefreshdisable={setRefreshdisable} AssettabFetchHelper={AssettabFetchHelper} Refresh={Refresh}/>
      //     </Fragment>
      //   ),
      // },
      ];
    
      return (
        <Fragment >
          <div style={{padding: "0.9em", marginTop:'-25px'}}>
        <EuiTabbedContent
          tabs={tabs}
          initialSelectedTab={tabs[0]}
          autoFocus="selected"
          onTabClick={(tab) => {
            console.log('clicked tab', tab);
          }}
        />
        <EuiSpacer/>
        </div>
        </Fragment>     
 );
    };

export default SubNav;