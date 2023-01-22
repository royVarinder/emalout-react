import React from "react";
import channelLogo from "../../Assets/logos/malout-online.png";
import Button from "../Elements/Button";
import newsImage from "../../Assets/newsimage/news.jpeg";
import mobileImage from "../../Assets/newsimage/123.jpeg";
import Mimit from "../../Assets/newsimage/mimit.jpeg";
import Slider from "react-slick"
import { settings } from "../Config/Config";
const EmNews = () => {
    const newsDescription = "ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ";
    let lengthDescription = newsDescription.length;
 
  return (
    <div className="parentNews em-flex em-shadow margin-1 marginBottom-2 em-border-radius em-flex-wrap">
      <div className="newsLeft">
        <div className="newsImages">
        <Slider {...settings}>
          <img src={newsImage} alt="news" />
          <img src={Mimit} alt="news" />
       
        </Slider>
        </div>
    
    <div className="channelImage">
        <img src={channelLogo} />
    </div>
        
      </div>
      <div className="newsRight em-text-left padding-2">
        <div className="title em-flex em-horizontal-align-between">
          <div className="newsTitle">
            <h3>
              ਪੰਜਾਬ ਨੰਬਰਦਾਰ ਐਸੋਸੀਏਸ਼ਨ ਗਾਲਿਬ ਜ਼ਿਲ੍ਹਾ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਨੇ ਏ.ਡੀ.ਸੀ
              ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਸੌਂਪਿਆ ਮੰਗ ਪੱਤਰ
            </h3>
          </div>
          <div className="newsChannel em-text-right">
              <div className="channelName">
                <h4>Malout Live</h4>
              </div>
              <div className="AuthorName">
                <p className="margin-0">(Varinder Singh)</p>
              </div>
          </div>
        </div>
        <div className="dateTimeTitle em-flex em-horizontal-align-between">
          
          <div className="newsAuthor em-flex">
            <div className="parentAuthor em-flex">
             
            </div>
          </div>
        </div>
        <div className="newsDescription paddingTopBottom-2">
         <p className="margin-0">{newsDescription}</p>
        </div>
        <div className="newsFooter ">
        <div className="newsdateTime">
            <p className="margin-0">2022-11-04 15:52:11</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmNews;
