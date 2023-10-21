import { useRouter } from "next/router";
import styles from "styles/Share.module.css";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramIcon,
  } from "react-share";
const ShareIcon = () => {
  const router = useRouter();
  const Links = `https://mohamed-ibrahiem.com` + router.asPath;
    return ( 
      <div className={styles.share}>

            <h4 >دعوة الاصدقاء </h4>
            <div className={styles.icons}>
              <FacebookShareButton
                url={Links}
                // title="facebook"
                quote={"title"}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <LinkedinShareButton
                url={Links}
                // title="facebook"
                quote={"title"}
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <TelegramShareButton
                url={Links}
                // title="facebook"
                quote={"title"}
              >
                <TelegramIcon size={40} round />
              </TelegramShareButton>
              <TwitterShareButton
                url={Links}
                // title="facebook"
                quote={"title"}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={Links}
                // title="facebook"
                quote={"title"}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>
            </div>
    );
}
 
export default ShareIcon;