import { h } from 'hyperapp'
import _Page from '@gulw/components/lib/page'
import '@gulw/components/lib/page/style'

const Page = ({ key }, children) => {
  return (
    <_Page key={key}>
      {children}
    </_Page>
  )
}

export default Page
