import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));

const Specialty = React.lazy(() => import("./Demo/Other/Specialty/Specialty"));
const UIBasicButton = React.lazy(() =>
	import("./Demo/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
	import("./Demo/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
	import("./Demo/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
	import("./Demo/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
	import("./Demo/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
	import("./Demo/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() => import("./Demo/Forms/FormsElements"));

const BootstrapTable = React.lazy(() => import("./Demo/Tables/BootstrapTable"));

const Nvd3Chart = React.lazy(() => import("./Demo/Charts/Nvd3Chart/index"));

const GoogleMap = React.lazy(() => import("./Demo/Maps/GoogleMap/index"));

const OtherSamplePage = React.lazy(() => import("./Demo/Other/SamplePage"));

const DoctorPage = React.lazy(() => import("./Demo/Other/Doctor/Doctor"));

const PatientPage = React.lazy(() => import("./Demo/Other/Patient/Patient"));

const OtherDocs = React.lazy(() => import("./Demo/Other/Docs"));

const PaymentPage = React.lazy(() => import("./Demo/Other/Payment/Payment"));

const QuestionnairePage = React.lazy(() =>
	import("./Demo/Other/Questionnaire/Questionnaire")
);

const routes = [
	{
		path: "/questionnaire",
		exact: true,
		name: "Default",
		component: QuestionnairePage,
	},
	{
		path: "/dashboard/default",
		exact: true,
		name: "Default",
		component: DashboardDefault,
	},
	{ path: "/specialty", exact: true, name: "Specialty", component: Specialty },
	{
		path: "/basic/button",
		exact: true,
		name: "Basic Button",
		component: UIBasicButton,
	},
	{
		path: "/basic/badges",
		exact: true,
		name: "Basic Badges",
		component: UIBasicBadges,
	},
	{
		path: "/basic/breadcrumb-paging",
		exact: true,
		name: "Basic Breadcrumb Pagination",
		component: UIBasicBreadcrumbPagination,
	},
	{
		path: "/basic/collapse",
		exact: true,
		name: "Basic Collapse",
		component: UIBasicCollapse,
	},
	{
		path: "/basic/tabs-pills",
		exact: true,
		name: "Basic Tabs & Pills",
		component: UIBasicTabsPills,
	},
	{
		path: "/basic/typography",
		exact: true,
		name: "Basic Typography",
		component: UIBasicBasicTypography,
	},
	{
		path: "/forms/form-basic",
		exact: true,
		name: "Forms Elements",
		component: FormsElements,
	},
	{
		path: "/tables/bootstrap",
		exact: true,
		name: "Bootstrap Table",
		component: BootstrapTable,
	},
	{
		path: "/charts/nvd3",
		exact: true,
		name: "Nvd3 Chart",
		component: Nvd3Chart,
	},
	{
		path: "/maps/google-map",
		exact: true,
		name: "Google Map",
		component: GoogleMap,
	},
	{
		path: "/sample-page",
		exact: true,
		name: "Sample Page",
		component: OtherSamplePage,
	},
	{ path: "/doctor", exact: true, name: "Sample Page", component: DoctorPage },
	{
		path: "/patient",
		exact: true,
		name: "Sample Page",
		component: PatientPage,
	},
	{
		path: "/payment",
		exact: true,
		name: "Payment Page",
		component: PaymentPage,
	},
	{ path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
];

export default routes;
