import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import WhatWeDo from './pages/WhatWeDo.jsx'
import Advisory from './pages/Advisory.jsx'
import Engineering from './pages/Engineering.jsx'
import AiProducts from './pages/AiProducts.jsx'
import HowWeWork from './pages/HowWeWork.jsx'
import ClientJourney from './pages/ClientJourney.jsx'
import DeliveryModel from './pages/DeliveryModel.jsx'
import EngagementModel from './pages/EngagementModel.jsx'
import AgenticAi from './pages/AgenticAi.jsx'
import WhyMile42 from './pages/WhyMile42.jsx'
import Proof from './pages/Proof.jsx'
import Partners from './pages/Partners.jsx'
import Insights from './pages/Insights.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'

const SUFFIX = ' · Mile42 prototype'

const PAGES = [
  {
    path: '/',
    title: 'We help organizations deliver their most important work' + SUFFIX,
    Component: Home,
  },
  { path: '/what-we-do', title: 'What we do' + SUFFIX, Component: WhatWeDo },
  { path: '/what-we-do/advisory', title: 'Advisory' + SUFFIX, Component: Advisory },
  { path: '/what-we-do/engineering', title: 'Engineering' + SUFFIX, Component: Engineering },
  { path: '/what-we-do/ai-products', title: 'AI-driven Products' + SUFFIX, Component: AiProducts },
  { path: '/how-we-work', title: 'How we work' + SUFFIX, Component: HowWeWork },
  {
    path: '/how-we-work/client-journey',
    title: 'Client journey' + SUFFIX,
    Component: ClientJourney,
  },
  {
    path: '/how-we-work/delivery-model',
    title: 'Delivery model' + SUFFIX,
    Component: DeliveryModel,
  },
  {
    path: '/how-we-work/engagement-model',
    title: 'Engagement model' + SUFFIX,
    Component: EngagementModel,
  },
  { path: '/agentic-ai', title: 'Agentic AI' + SUFFIX, Component: AgenticAi },
  { path: '/why-mile42', title: 'Why Mile42' + SUFFIX, Component: WhyMile42 },
  { path: '/proof', title: 'Proof' + SUFFIX, Component: Proof },
  { path: '/partners', title: 'Partners' + SUFFIX, Component: Partners },
  { path: '/insights', title: 'Insights' + SUFFIX, Component: Insights },
  { path: '/contact', title: 'Contact' + SUFFIX, Component: Contact },
  { path: '/legal/privacy', title: 'Privacy' + SUFFIX, Component: Privacy },
]

export default function App() {
  return (
    <Routes>
      {PAGES.map(({ path, title, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout title={title}>
              <Component />
            </Layout>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
