import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
function add(n1, n2) {
  return n1 + n2
}
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    expect(add(1, 2)).toBe(3)
  })
})
