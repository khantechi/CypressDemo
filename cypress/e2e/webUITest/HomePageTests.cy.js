import 'cypress-iframe'
import HomePage from '../../PageObjects/HomePage'

describe('Cypress Demo Suite', ()=>{

    const homePage = new HomePage(); 

let userdata;
before(()=>{
    cy.fixture("testData").then((data)=>{
        userdata=data;
    })
})

beforeEach(()=>{
    cy.visit(userdata.url)  
})

        it('T01 - Select and validate Checkbox', ()=>{    
            homePage.selectCheckBox(3)
            cy.get(homePage.checkbox3).should('be.checked')
            //assert not checked
            cy.get(homePage.checkbox3).uncheck().should('be.not.checked').and('have.value', 'option3')

            homePage.selectCheckBox(1)
            cy.get(homePage.checkbox1).should('be.checked')
            //assert not checked
            cy.get(homePage.checkbox1).uncheck().should('be.not.checked').and('have.value', 'option1')
        })


        it('TC02 - Select and validate Radio button', ()=>{
            homePage.selectRadioButton("radio1")
            cy.get(homePage.radioButton1).should('be.checked').and('have.value', 'radio1')
            //assert 1,3 not selected 
            cy.get(homePage.radioButton2).should('be.not.selected')
            cy.get(homePage.radioButton3).should('be.not.selected')
        })


        it('TC03 - Select and validate value from auto-populate list dropdown', ()=>{
            //cy.get('Select').select("Option2")
            cy.get(homePage.autopopulateInput).type('ind')        
            cy.get(homePage.autoPopulateListInputText).each(function ($ele, index, $list){
                if($ele.text().includes(userdata.country)){
                    cy.wrap($ele).click()
                }
            })
            cy.get(homePage.autopopulateInput).should('have.value',userdata.country);
        })


        it('TC04 - Validate text on simple alert pop up', ()=>{
            homePage.enterInput(homePage.alertInput,userdata.lastname)
            cy.on(homePage.windowAlert, (tabs)=>{
                expect(tabs).to.contains(userdata.simpleAlert)
            })
            cy.get(homePage.alertBtn).click()
        })


        it('TC05 - Validate text on Confirm alert pop up', ()=>{
            homePage.enterInput(homePage.alertInput,userdata.firstname)
            cy.on(homePage.windowAlertConfirm, (t)=>{
                expect(t).to.contains(userdata.confirmAlert)
            })
            cy.get(homePage.alertBtn).click()
        })


        it('TC06 - Validate text on Confirm alert popup and click Cancel', ()=>{
            homePage.enterInput(homePage.alertInput,userdata.firstname)
            cy.on(homePage.windowAlertConfirm, (t)=>{
                expect(t).to.contains(userdata.confirmAlert)
            })
            cy.get(homePage.confirmBtn).click()
            cy.on(homePage.windowAlertConfirm, ()=>false) // to click on cancel from prompt alert
        })


        it('TC07 - Verify number of rows in a web table', ()=>{
            cy.xpath(homePage.table1).should('have.length',11)
            cy.xpath(homePage.table2).should('have.length',9)
        })


        it('TC08 - Validate element presence after clicking Hide/Show button', ()=>{
            cy.xpath(homePage.hideBtn).click()
            cy.xpath(homePage.inputTextFieldHidden).should('not.be.visible')            
            cy.xpath(homePage.showBtn).click()
            cy.xpath(homePage.inputTextFieldShow).should('be.visible')
        })


        it('TC09 - Validate opening url in new tab and assert url', ()=>{
            cy.get("#opentab").invoke('removeAttr','target').click()
            cy.url().should('include',userdata.textToVerify)
            cy.go('back')
        })


        it('TC10 - Verify mouse hover and select option', ()=>{
            cy.get(homePage.mouseHoverBtn).invoke('show')
            cy.contains("Top").click({force:true})
            cy.url().should('include','top')
        })    
        
        it('TC11 - Verify clicking on link under iFrame', ()=>{
            cy.frameLoaded(homePage.courseFrame)
            cy.iframe().find(homePage.learningPathLink).eq(0).click()
        })

        it('TC12 - Click on link using custom command', ()=>{
            cy.clickLink("Free Access to InterviewQues/ResumeAssistance/Material")
            cy.url().should('include','documents-request')
        })
})