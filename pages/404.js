import Link from 'next/link'
import styles from "styles/FourohFour.module.css"
export default function FourOhFour() {
  return <div className={styles.PageFour}>
    <h1>هذه الصفحة غير موجودة الان</h1>
    <Link href="/">
      <a>
       الذهاب الي الصفحة الرئيسية
      </a>
    </Link>
  </div>
}