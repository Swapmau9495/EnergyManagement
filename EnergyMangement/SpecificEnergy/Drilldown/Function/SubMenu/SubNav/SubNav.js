import React, {  Fragment } from 'react';
import {EuiTabbedContent,EuiSpacer} from '@elastic/eui';
import AllAssetsTable from '../AllAssetsTable/AllAssetsTable';
import AllPanelTable from '../AllPanelTable/AllPanelTable';
const SubNav = ({Refresh,allassettablefetchhelper,AssettabFetchHelper,setRefreshdisable,allpaneltablefetchhelper}) => {

  //Created Tabs for Function Level Table and Asset Level Table
    const tabs = [
       {
        id: 'PanelLevel',
        name:<strong>Panels</strong>,
        content: (
          <Fragment>
             <AllPanelTable setRefreshdisable={setRefreshdisable} allpaneltablefetchhelper={allpaneltablefetchhelper} Refresh={Refresh}/> 
          </Fragment>
        ),
      },
      {
        id: 'AssetLevel',
        name: <strong>Assets</strong>,
        content: (
          <Fragment>
          <AllAssetsTable setRefreshdisable={setRefreshdisable} allassettablefetchhelper={allassettablefetchhelper}  Refresh={Refresh}/>
          </Fragment>
        ),
      },
     
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