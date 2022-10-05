import * as React from 'react';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const options = ['Edit', 'Delete'];

ActionButton.propTypes = {
    itemid: PropTypes.string.isRequired
};

export default function ActionButton(props){

    const {itemid} = props;

    const [btnopen, setBtnOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleDelete = (id) => {

        try {
            fetch('http://localhost:8000/api/expense/' + id, {
                method: 'DELETE'
            });
        } catch (err) {

        }
    }

    const handleEdit = (id) => {

        try {

            fetch('http://localhost:8000/api/expense/' + id)
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                });
        } catch (err) {

        }
    }

    const handleClick = () => {

        if(options[selectedIndex] === 'Remove'){
            handleDelete(itemid)
        }else {
            handleEdit(itemid)
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setBtnOpen(false);
    };

    const handleToggle = () => {
        setBtnOpen((prevOpen) => !prevOpen);
    };

    const handleBtnClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setBtnOpen(false);
    };

    return(
        <div>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={btnopen ? 'split-button-menu' : undefined}
                    aria-expanded={btnopen ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}>

                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={btnopen}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal>

                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}>

                        <Paper>
                            <ClickAwayListener onClickAway={handleBtnClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}>

                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}