import HomePage from "../../PageObjects/HomePage"
import 'cypress-iframe'


const homePage = new HomePage(); 
let userdata;
before(()=>{
    cy.fixture("testData").then((data)=>{
        userdata=data;
    })
})

describe('Course API mock', ()=>{ 

    beforeEach(()=>{
        cy.intercept('GET','**/course', {fixture:'course.json'})
        cy.visit(userdata.url)
    })

    it.only('mock and validate', ()=>{
        cy.frameLoaded(homePage.courseFrame)
        cy.iframe().xpath(homePage.coursePrice).should('have.text','9999')
    })
})
