import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './work.css';
function Work() {
    const[activeTab, setActiveTab] = React.useState('tab1')
    const handleTabClick =(tab) =>{
        console.log('tab clicked')
        setActiveTab(tab);
    };
    return (
        <div className='col-lg-3 mt-5 border-right border-dark'>
            <div className="row">
                <button class="btn btn-dark" className={activeTab ==='tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>Titlu de la primul proiect</button>
                <button class="btn btn-dark" className={activeTab ==='tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>titlu de la al2lea proiect</button>
                <button class ="btn btn-dark"className={activeTab === 'tab3' ? 'active' : ''} onClick={() =>handleTabClick('tab3')}>titlu de la al2 lea proicet</button>
            </div>


            <div className="col-lg-9 tab-content">
                {activeTab === 'tab1' && (<div><h2>content proiect 1</h2><p>cevvafbahguyfgbsyubdfjjhdsfb</p></div>)}
                {activeTab === 'tab2' && (<div><h2>content proiect 2</h2><p>cevvafbahguyfgbsyubdfjjhdsfb</p></div>)}
                {activeTab === 'tab3' && (<div><h2>content proiect 3</h2><p>cevvafbahguyfgbsyubdfjjhdsfb</p></div>)}
            </div>
        </div>
    );
}

export default Work;