import { h } from 'hyperapp'

const Page = ({ key }, children) => {
  return (
    <div class={`page page-${key}`} key={key}>
      <div class="page-inner">{children}</div>
    </div>
  )
}

export default Page
