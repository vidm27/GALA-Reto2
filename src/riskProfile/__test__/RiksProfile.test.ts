import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import RiksProfile from "@/riskProfile/components/RiksProfile.vue";
import useRiskProfile from "@/riskProfile/composables/useRiskProfile";

describe('RiskProfile Tests', () => {
    it('should render component', () => {
        const wrapper = mount(RiksProfile)
    })

    it('should show erro span text', async () => {
        const wrapper = mount(RiksProfile)
        await wrapper.find('button#btnEvaluateProfile').trigger('click')
        expect(wrapper.find('div#notMakeEvaluate').exists())
    })
})
