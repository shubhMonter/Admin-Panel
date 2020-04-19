import React from "react";
import { Tree } from "antd";
const TreeSection = (props) => {
	// console.log("this is props", props);

	const giveMytree = (question, tree) => {
		if (question === undefined) {
			return;
		}
		// console.log(question);
		let option = question.option;
		for (var i = 0; i < option.length; i++) {
			// console.log(option[i]);
			for (var j = 0; j < option[i].linkedQuestion.length; j++) {
				// console.log("linked", option[i].linkedQuestion[j]);
				tree.children.push({
					title: option[i].linkedQuestion[j].title,
					key: option[i].linkedQuestion[j]._id,
					option: option[i].linkedQuestion[j].option,
					children: [],
				});
				giveMytree(
					option[i].linkedQuestion[j],
					tree.children[tree.children.length - 1]
				);
			}
		}
		// for (var i = 0; i < option.length; i++) {
		// 	console.log("options" + i, option[i]);
		// 	if (option[i].linkedQuestion.length > 0) {
		// 		console.log("all option are", option);
		// 		for (var j = 0; j < option[i].linkedQuestion.length; j++) {
		// 			tree.children.push({
		// 				title: option[i].linkedQuestion[j].title,
		// 				key: option[i].linkedQuestion[j]._id,
		// 				option: option[i].linkedQuestion[j].option,
		// 				children: [],
		// 			});
		// 			let d = giveMytree(
		// 				question.option[i].linkedQuestion[j],
		// 				tree.children[tree.children.length - 1]
		// 			);
		// 		}
		// 	}
		// }
	};
	let Mytree = [
		{
			title: props.question.title,
			key: props.question._id,
			option: props.question.option,
			children: [],
		},
	];
	giveMytree(props.question, Mytree[0]);
	// console.log("MyTree is", Mytree);

	// console.log(props);
	// const onSelect = (selectedKeys, info) => {
	// 	console.log("selected", selectedKeys, info);
	// 	props.onSelectHandler(selectedKeys[0]);
	// };

	return (
		<Tree
			checkable
			// defaultExpandedKeys={["0-0-0", "0-0-1"]}
			// defaultSelectedKeys={["0-0-0", "0-0-1"]}
			// defaultCheckedKeys={["0-0-0", "0-0-1"]}
			// onSelect={onSelect}
			// onCheck={onCheck}
			onSelect={props.onSelectHandler}
			treeData={Mytree}
		/>
	);
};
export default TreeSection;

// import React, { useState } from "react";
// import { Tree, Switch } from "antd";
// import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";

// const treeData = [
// 	{
// 		title: "parent 1",
// 		key: "0-0",
// 		icon: <CarryOutOutlined />,
// 		children: [
// 			{
// 				title: "parent 1-0",
// 				key: "0-0-0",
// 				icon: <CarryOutOutlined />,
// 				children: [
// 					{
// 						title: "leaf",
// 						key: "0-0-0-0",
// 						icon: <CarryOutOutlined />,
// 					},
// 					{
// 						title: "leaf",
// 						key: "0-0-0-1",
// 						icon: <CarryOutOutlined />,
// 					},
// 					{
// 						title: "leaf",
// 						key: "0-0-0-2",
// 						icon: <CarryOutOutlined />,
// 					},
// 				],
// 			},
// 			{
// 				title: "parent 1-1",
// 				key: "0-0-1",
// 				icon: <CarryOutOutlined />,
// 				children: [
// 					{
// 						title: "leaf",
// 						key: "0-0-1-0",
// 						icon: <CarryOutOutlined />,
// 					},
// 				],
// 			},
// 			{
// 				title: "parent 1-2",
// 				key: "0-0-2",
// 				icon: <CarryOutOutlined />,
// 				children: [
// 					{
// 						title: "leaf",
// 						key: "0-0-2-0",
// 						icon: <CarryOutOutlined />,
// 					},
// 					{
// 						title: "leaf",
// 						key: "0-0-2-1",
// 						icon: <CarryOutOutlined />,
// 						switcherIcon: <FormOutlined />,
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

// const Demo = () => {
// 	const [showLine, setShowLine] = useState(true);
// 	const [showIcon, setShowIcon] = useState(false);

// 	const onSelect = (selectedKeys, info) => {
// 		console.log("selected", selectedKeys, info);
// 	};

// 	return (
// 		<div>
// 			<div
// 				style={{
// 					marginBottom: 16,
// 				}}
// 			>
// 				showLine: <Switch checked={showLine} onChange={setShowLine} />
// 				<br />
// 				<br />
// 				showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
// 			</div>
// 			<Tree
// 				showLine={showLine}
// 				showIcon={showIcon}
// 				defaultExpandedKeys={["0-0-0"]}
// 				onSelect={onSelect}
// 				treeData={treeData}
// 			/>
// 		</div>
// 	);
// };
// export default Demo;
