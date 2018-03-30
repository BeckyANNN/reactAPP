import React,{Component} from "react"

import {connect} from "react-redux"

import {hashHistory,Link} from "react-router"
import {get_banner,get_all} from "../../actions"

import { Carousel } from 'antd';
import Foot from "../../components/foot"

import poster from "../../../../assets/images/item1.png"
import pic1 from "../../../../assets/images/pic1.png"
import pic2 from "../../../../assets/images/pic2.png"
import pic3 from "../../../../assets/images/pic3.png"
import pic4 from "../../../../assets/images/pic4.png"
import pic5 from "../../../../assets/images/pic5.png"
import pic6 from "../../../../assets/images/pic6.png"
import pic7 from "../../../../assets/images/pic7.png"
@connect(
    (state)=>({...state})
)
export default class All extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(get_banner("/banner",dispatch));
        dispatch(get_all("/all",dispatch));

    } 
    render(){
        const {banner,list} = this.props;

        var html =null;
        var itemlist = null;
        if(banner.length>0){
            html=(
                <Carousel autoplay>
                    {
                        banner.map((item,i)=>{
                            return(
                                <img src={item.cover} title={item.title} key={i}/>
                            )
                        })
                    }
                </Carousel>
            )
            itemlist=(
               <div>
                    {
                        list.map((item1,idx)=>{
                            return (
                                <div className="list-main" key={idx}>
                                    <Link to={"subject/"+item1.content_id}>
                                        <dl>
                                            <dt><img src={item1.cover}/></dt>
                                            <dd><p>{item1.title}</p></dd>
                                        </dl>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        return(
            <div className="all">
                <header>
                    <p>ONE IS ALL</p>
                    <i className="iconfont icon-chazhao" onClick={()=>{hashHistory.push("/search")}}></i>
                </header>
                    {html}
                <section>
                    <div className="nav">
                       <div className="nav-main">
                        <h2>分类导航</h2>
                            <div className="pic">
                                <Link to="info"><img src={pic1}/></Link>
                                <img src={pic2}/>
                                <img src={pic7}/>
                                <img src={pic3}/>
                                <img src={pic4}/>
                                <img src={pic5}/>
                                <img src={pic6}/>
                            </div>
                       </div>
                    </div>
                    <div className="list">
                        {itemlist}
                        {/* <dl>
                            <dt><img src={poster}/></dt>
                            <dd><p>秋日私语,余音入耳声渐浓。</p></dd>
                        </dl> */}
                    </div>
                </section>
                <Foot/>
            </div>
            
            
        )
    }
}