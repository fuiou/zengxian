<template>
	<div id="content">
		<div class="header">
			申请详情
			<img @click.stop="back" class="back" src="/static/images/back.png" alt="">
		</div>
		<div class="result_head">
			<img src="/static/images/success.png" alt="">
			<span>提交成功!</span>
			<p>您已申请<span></span>一份，稍后将有客服人员与您联系，协助办理保险事宜。</p>
		</div>
		<div class="cont clearfix">
			<div class="cont_head">
				<p>赠险内容：<span></span></p>
				<p>保障期限：<span></span></p>
			</div>
			<table class="table" border="1" cellspacing="0">
				<tr class="table_head">
					<td>保险内容</td>
					<td>最高保额</td>
				</tr>
				<tr>
					<td>航空（飞机）意外伤害身故、残疾</td>
					<td>100万元</td>
				</tr>
				<tr>
					<td>火车、地铁、轻轨意外伤害身故、残疾</td>
					<td>50万元</td>
				</tr>
				<tr>
					<td>轮船意外伤害身故、残疾</td>
					<td>50万元</td>
				</tr>
				<tr>
					<td>商业运营汽车意外和出租车意外伤害身故、残疾</td>
					<td>10万元</td>
				</tr>
				<tr>
					<td>飞机、火车、地铁、轻轨、轮船、商业运营汽车、出租车意外伤害医疗</td>
					<td>2万元</td>
				</tr>
				<tr>
					<td>行李物品和旅行证件损失</td>
					<td>500元</td>
				</tr>
			</table>
			<div class="sure">确认</div>
		</div>
		<!-- 加载 -->
		<div v-show="false" class="loading_wrapper">
			<div class="loading">
				<img src="/static/images/loading2.gif" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	export default{}
</script>
<style scoped lang="less">
	#content{
		position:relative;
		width:100%;
		height:100%;
		.loading_wrapper{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			background:rgba(0,0,0,0);
			.loading{
				margin:12rem auto 0;
				width:6rem;
				height:6rem;
				background:rgba(0,0,0,.7);
				img{
					margin:1.5rem auto 0;
					width:3rem;
					height:3rem;
				}
			}
		}
		.header{
			position:fixed;
			left:0;
			top:0;
			width:100%;
			height:2.25rem;
			line-height:2.25rem;
			font-size:.85rem;
			color:#000;
			text-align:center;
			background:#f0f0f0;
			img.back{
				position:absolute;
				left:.5rem;
				top:.65rem;
				width:.5rem;
				height:.85rem;
			}
		}
		.result_head{
			img{
				width:2rem;
				height:2rem;
				margin:4.25rem auto 0;
			}
			&>span{
				float:left;
				width:100%;
				height:2.2rem;
				line-height:2.2rem;
				color:#ff4343;
				font-size:.95rem;
			}
			p{
				margin:.75rem;
				width:17.5rem;
				line-height:1rem;
				font-size:.75rem;
				color:#292928;
				text-align:left;
				span{
					color:#ff4343;
				}
			}
		}
		.cont{
			padding-top:.5rem;
			margin:.75rem auto 0;
			width:16.5rem;
			background:#f2f2f2;
			p{
				width:100%;
				height:1rem;
				line-height:1rem;
				font-size:.7rem;
				color:#292928;
				text-align:left;
				text-indent:1rem;
				span{
					color:#ff4343;
				}
			}
			.table{
				margin:.75rem auto 0;
				width:15.88rem;
				border:0;
				border-collapse :collapse ;
				tr{
					height:1.25rem;
					&.table_head{
						background:#ff4343;
						color:#fff;
						td{
							font-size:.7rem;
							border-color:#ff4343;
						}
					}
					td{
						font-size:.6rem;
						border-color:#c3c0c0;
						&:nth-child(2){
							width:4.7rem;
						}
					}
				}
			}
			.sure{
				margin:.75rem auto;
				width:15.25rem;
				height:2.2rem;
				background:#ff4343;
				color:#fff;
				font-size:.9rem;
				line-height:2.2rem;
				border-radius:10px;
				letter-spacing:10px;
			}
		}
	}
</style>