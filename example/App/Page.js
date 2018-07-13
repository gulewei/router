import { h } from 'hyperapp'

const Page = ({ name }, children) => {
  return (
    <div class={`page page-${name}`} key={name}>
      <div class="page-inner">{children}</div>
    </div>
  )
}

export default Page
