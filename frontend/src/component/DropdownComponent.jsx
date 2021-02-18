import React, { Component } from 'react';

class SelectOption extends Component {
    render() {
        return (
            <option value={this.props.dataItem.id}>{this.props.dataItem.name}</option>
        )
    }
}

class DropdownComponent extends Component {
    render() {
        let choices = [];

        if (this.props.selectableData) {
            const selectableData = this.props.selectableData;
            choices = selectableData.map((dataItem) =>
                <SelectOption key={'choice_' + dataItem.id} dataItem={dataItem}/>
            );
        }

        return (
            <div>
                <select onChange={this.props.handleInputChange} name={this.props.name} value = {this.props.selectedId}>
                <option value="">Тип документа</option>
                    {choices}
                </select>
            </div>
        )

    }
}

export default DropdownComponent;
