class HomePage{

    checkbox1="#checkBoxOption1"
    checkbox2="#checkBoxOption2"
    checkbox3="#checkBoxOption3"
    radioButton1="input[value='radio1']"
    radioButton2="input[value='radio2']"
    radioButton3="input[value='radio3']"
    autopopulateInput="#autocomplete"
    autoPopulateListInputText="li[class='ui-menu-item']"
    alertInput="#name"
    windowAlert="window:alert"
    windowAlertConfirm="window:confirm"
    alertBtn="#alertbtn"
    confirmBtn="#confirmbtn"
    table1="//table[@name='courses']/tbody/tr"
    table2="//div[@class='tableFixHead']/table[@id='product']/tbody/tr"
    hideBtn="//input[@id='hide-textbox']"
    showBtn="//input[@id='show-textbox']"
    inputTextFieldHidden="//input[@style='display: none;']"
    inputTextFieldShow="//input[@style='display: block;']"
    mouseHoverBtn=".mouse-hover-content"
    courseFrame="#courses-iframe"
    learningPathLink="a[href='learning-path']"



    enterInput(inputLocator,inputValue){
        cy.get(inputLocator).clear()
        cy.get(inputLocator).type(inputValue)
    }

    verifyElement(locator, checkedOrUncheck){
        if(checkedOrUncheck === 'checked'){
            cy.get(locator).should('be.checked')
        }else if(checkedOrUncheck === 'unchecked'){
            cy.get(locator).should('be.not.checked')
        }
        
    }



    selectCheckBox(option){
    switch(option){
        case 1:
            cy.get(this.checkbox1).check()
            break;
        case 2:
            cy.get(this.checkbox2).check()
            break;
        case 3:
            cy.get(this.checkbox3).check()
            break;
    }    
    }

    selectRadioButton(buttonLabel){
        cy.get("input[type='radio']").check(buttonLabel)
    }

}

export default HomePage;