import React, { useState,useEffect } from "react";
import {
  EuiPopover,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiButton,
} from "@elastic/eui";

const contextMenuStyle = {
  paddingRight: '33px',
  maxHeight:'200px',
  // minWidth:'300px',
}

const CommonPopover = ({ValueToSelect,Lists,PopoverName,onChange,IsButtonLoading}) => {
  // console.log(Lists,PopoverName);
  const [State, setState] = useState({
    isPopoverOpen: false,
    Name: '',
    List: []
  })
  // console.log(State);
  useEffect(()=>{
    setState({
      isPopoverOpen: false,
      Name:  Lists[0],
      List: Lists
    })
  },[Lists])
  const onButtonClick = () => {
    let tempState = {
      ...State,
      isPopoverOpen: !State.isPopoverOpen
    }
    setState(tempState);
  }

  const Button = (
    <EuiButton
      aria-label={PopoverName}
      iconType="arrowDown"
      iconSide="right"
      size="m"
      fullWidth
      isLoading={IsButtonLoading}
      onClick={onButtonClick}>
      {PopoverName}: {State.Name}
      
    </EuiButton>
  );

  const getIconTypes = (ClickedVal, StateVal) => {
    return ClickedVal === StateVal ? 'check' : 'empty';
  };

  const ListItems = State.List.map((value) => {
    let ListItem = (<EuiContextMenuItem
      key={value}
      icon={getIconTypes(value, State.Name)}
      onClick={() => {
        let tempState = {
          ...State,
          Name: value,
          isPopoverOpen: !State.isPopoverOpen
        }
        onChange(tempState.Name)
          // Changestatus(change=>!change)
        setState(tempState)
      }}
    >
      {value}
    </EuiContextMenuItem>)
    return ListItem;
  })

  return (
    <EuiPopover
      button={Button}
      isOpen={State.isPopoverOpen}
      closePopover={onButtonClick}
      panelPaddingSize="none"
      anchorPosition="downLeft"
      display="block"
    >

      <EuiContextMenuPanel
        className='eui-yScroll euiYScrollWithShadows'
        items={ListItems}
        style={contextMenuStyle} />
    </EuiPopover>
  )
}
export default CommonPopover