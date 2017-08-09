import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() title: string;
  @Input() addfresh: boolean;
  @Input() items: Array<string>;
  @Input() maxdisplay: number;

  selectedItem: string;
  listItems: Array<string>;
  showList: boolean;
  searching: boolean;
  filterItem: string;

  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  setDisabledState(isDisabled:boolean):void {}

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  constructor() {
    this.showList = false;
    this.searching = false;
    this.filterItem = null;
  }

  //Set the dropdown placeholder and initialize list items
  ngOnInit() {
    this.listItems = this.items.slice(0, this.maxdisplay);
    this.selectedItem = this.title;
  } // ngOnInit

  //Filter list items as user types 3 characters or more
  filterList() {

    let term = this.filterItem;

    if (term.length >= 3) {
      this.listItems = this.items.filter((item) => {
        return item.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    } else {
      this.listItems = this.items;
    }

    this.searching = term.length == 0 ? false: true;

  }//filterList()

  //Select the clicked value from the list
  selectItem(item){
    this.selectedItem = item;
    this.showList = false;
    this.onChangeCallback(this.selectedItem);
  } // selectItem

  //Add new item to the list and mark it as selected
  addNselect(){
    let itemToAdd = this.filterItem.charAt(0).toUpperCase()+this.filterItem.substr(1).toLowerCase();
    this.filterItem = '';
    this.items.unshift(itemToAdd);
    this.selectedItem = itemToAdd;
    this.onChangeCallback(this.selectedItem);
    this.listItems = this.items.slice(0, this.maxdisplay);
    this.searching = false;
    this.showList = false;
  }// addNselect

  //Show all items in the dropdown
  showAll(){
    this.listItems = this.items;
  } // showAll

  //Show only limited items in the dropdown
  showLess(){
    this.listItems = this.items.slice(0, this.maxdisplay);
  } // showLess

} // DropdownComponent
