import React, { useEffect, useState } from "react";
import channelLogo from "../../Assets/logos/malout-online.png";
import Button from "../Elements/Button";
import newsImage from "../../Assets/newsimage/news.jpeg";
import mobileImage from "../../Assets/newsimage/123.jpeg";
import Mimit from "../../Assets/newsimage/mimit.jpeg";
import Slider from "react-slick"
import { settings } from "../Config/Config";
import { emPostData } from "../Util";
import { em_procedur_id } from "../Config/procedureIds";
import { toast } from "react-toastify";
import { EM_COMMENTS, TYPE_BUTTON } from "../Config/emButton";
const EmNews = () => {
  const [newsList, setNewsList] = useState([]);
  const newsDescription = "ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨਇਸ ਸੰਬੰਧੀ ਸ਼੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਦੇ ਏ.ਡੀ.ਸੀ ਮਨਦੀਪ ਕੌਰ ਨੂੰ ਮੰਗ ਪੱਤਰ ਵੀ ਸੌਂਪਿਆ ਗਿਆ। ਇਸ ਮੌਕੇ ਬਲਕਰਨ ਸਿੰਘ ਗੋਲਡੀ ਭਾਗਸਰ, ਜਗਸੀਰ ਸਿੰਘ ਸੁਖਨਾ, ਗੁਰਦੀਪ ਸਿੰਘ ਗੁਰੂਸਰ, ਚਾਨਣ ਸਿੰਘ ਚੱਕ ਗਾਧਾਂ, ਬੋਹੜ ਸਿੰਘ ਰਾਮਗੜ ਚੁੱਘਾ, ਕਾਕਾ ਸਿੰਘ ਪ੍ਰਧਾਨ ਲੰਬੀ, ਮੰਗਾ ਸਿੰਘ ਗੋਨਿਆਣਾ, ਤੇਜਿੰਦਰ ਸਿੰਘ ਸ਼ੇਰੇਆਲਾ, ਸਰਦੇਵ ਸਿੰਘ ਗੰਧੜ, ਚੂਹੜ ਸਿੰਘ ਭੁੱਟੀਆਲਾ, ਵੀਰ ਸਿੰਘ ਗੂੜੀ ਸੰਘਰ, ਬਲਜਿੰਦਰ ਕੁਰਾਈਵਾਲਾ, ਹਰਸ਼ ਸ਼ਰਮਾ ਕੁਕਰੀਆਂ, ਲਾਭ ਸਿੰਘ ਛੱਤੇਆਣਾ, ਗੁਰਲਾਲ ਸਿੰਘ ਦਾਨੇਵਾਲਾ, ਜਗਸੀਰ ਸਿੰਘ ਤਰਖਾਣ ਵਾਲ਼ਾ, ਮਨਜੀਤ ਸਿੰਘ ਜਗਤ ਸਿੰਘ, ਹਰਦੇਵ ਸਿੰਘ ਆਸਾ ਬੁੱਟਰ ਅਤੇ ਇਕਬਾਲ ਸਿੰਘ ਹਾਜ਼ਿਰ ਸਨ ";
  let lengthDescription = newsDescription.length;


  const getAllNews = () => {
    try {
      emPostData(em_procedur_id?.em_get_all_news_customers, {}).then((res) => {
        if (res?.success === 1) {
          setNewsList(res?.data)
          return
        }
        toast.error(res?.message);
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      getAllNews();
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className="">

      {newsList.length > 0 ? newsList.map((items, index) => {
        console.log('items :>> ', items);
        const { images, title, description, createdAt, author_name } = items;
        const _images = images.split(",");
        return (
          <div key={index} className="parentNews em-flex em-shadow margin-1 marginBottom-2 em-border-radius em-flex-wrap">
            <div className="newsLeft">
              <div className="newsImagesNewsList">
                {/* <Slider {...settings}> */}
                  {_images.map((_items, idx) => {
                    const fileExtention = _items.split(".")[1];
                    return fileExtention === 'mp4' ?
                      <video className="margin-1" controls>
                        <source src={_items} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video> : <img className="margin-1" src={_items} key={idx} alt={title} />
                  })}
                {/* </Slider> */}
              </div>

              {/* <div className="channelImage">
                <img src={channelLogo} />
              </div> */}

            </div>
            <div className="newsRight em-text-left padding-2">
              <div className="title em-flex em-horizontal-align-between">
                <div className="newsTitle">
                  <h3>
                    {title}
                  </h3>
                </div>
                <div className="newsChannel em-text-right">
                  <div className="channelName">
                    <h4><i>{author_name}</i></h4>
                  </div>
                  {/* <div className="AuthorName">
                    <p className="margin-0">({})</p>
                  </div> */}
                </div>
              </div>
              <div className="dateTimeTitle em-flex em-horizontal-align-between">

                <div className="newsAuthor em-flex">
                  <div className="parentAuthor em-flex">

                  </div>
                </div>
              </div>
              <div className="newsDescription paddingTopBottom-2">
                <p className="margin-0">{description}</p>
              </div>
              <div className="newsFooter">
                <div className="newsdateTime em-flex em-horizontal-align-between">
                  <p className="margin-0">{createdAt}</p>
                  <p className="margin-0">

                  <Button
                        title={EM_COMMENTS}
                        id=""
                        type={TYPE_BUTTON}
                        className="em-button-cancel em-button-small marginRight-2"
                        onClick={() => {
                        }}
                    />

                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }) : ""}

    </div>
  );
};
export default EmNews;
