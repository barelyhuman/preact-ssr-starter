export default function PageTitle({ subTitle, children }) {
  return (
    <div class="headings">
      <h1>{children}</h1>
      <h2>{subTitle}</h2>
    </div>
  )
}
