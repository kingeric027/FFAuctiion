import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import { TextFieldProps, TextField, MenuItem, Paper } from '@material-ui/core';
import { Category } from 'ordercloud-javascript-sdk';

type RenderInputProps = TextFieldProps & {
    //ReturnType<typeof useStyles>;
    ref?: React.Ref<HTMLDivElement>;
  };

function renderInput(inputProps: RenderInputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        disabled
        InputProps={{
          inputRef: ref,
        //   classes: {
        //     root: classes.inputRoot,
        //     input: classes.inputInput,
        //   },
          ...InputProps,
        }}
        {...other}
      />
    );
}

function renderSuggestion(suggestionProps: any) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.value) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion} 
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion} 
      </MenuItem>
    );
}

interface DownShiftInputProps {
    selectedTeam: string | null;
    teams: Category[];
    onSelectionChange: (value: string | null) => void
}

const DownShiftInput: React.FunctionComponent<DownShiftInputProps> = (props) => {
    const {selectedTeam, teams, onSelectionChange} = props;
    const [inputValue, setInputValue] = useState<string>('')
    //const [downShiftOpen, setDownShiftOpen] = useState<boolean>(false);
    const [teamSuggestions, setTeamSuggestions] = useState<string[]>();


    useEffect(() => {
        var matches = teams.filter((team) => {
            return team.Name && team.Name.indexOf(inputValue) > -1;
        })
        inputValue === '' ? setTeamSuggestions(teams.map(team => team.Name!)) : 
            setTeamSuggestions(matches.map((match) => match.Name!))
    }, [teams, inputValue])

    const handleDownshiftChange = (value: string | null) => {
        console.log("DOWNSHIFT CHANGED")
        onSelectionChange(value)
        setInputValue('')
    }

    const handleBlur = () => {
        setInputValue("");
      }

    const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log("handleKeyDown")
    };

    const handleInputChange = (event: React.ChangeEvent<{ value: string }>) => {
        setInputValue(event.target.value);
    };


    return(
        <Downshift
        id="downshift-input"
        inputValue={inputValue}
        onChange={handleDownshiftChange}
        selectedItem={selectedTeam}
        initialHighlightedIndex={0}
        defaultHighlightedIndex={0}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                isOpen, 
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
            }) => {
                //isOpen ? setDownShiftOpen(true) : setDownShiftOpen(false)
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                    onBlur: handleBlur,
                    onKeyDown: handleKeyDown,
                    //placeholder: "Select Team",
                    disabled: selectedTeam && selectedTeam !== null
                  });
                  return(
                      <div>
                          {renderInput({
                            fullWidth: false,
                            //classes,
                            //label: "Team:",
                            InputLabelProps: getLabelProps(), 
                            InputProps: {
                            // endAdornment: selectedTeam &&  
                            //     <Chip label={selectedTeam} color="primary" onDelete={() => onSelectionChange(null)}></Chip>,
                            onBlur,
                            onChange: event => {
                                handleInputChange(event);
                                onChange!(event as React.ChangeEvent<HTMLInputElement>);
                            },
                            onFocus
                            },
                            inputProps,
                        })}
                        {isOpen ? (
                            <Paper square>
                            {teamSuggestions && teamSuggestions.map((suggestion: string, index: number) =>
                                renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion }),
                                highlightedIndex,
                                selectedItem: selectedItem2,
                                }),
                            )}
                            </Paper>
                        ) : null}
                      </div>
                  )
            }}
        </Downshift>
    )
}


export default DownShiftInput;