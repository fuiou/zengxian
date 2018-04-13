<template>
	<div id="content">
		<div v-if="!isWeiXin" class="header">
			赠险活动
			<img @click.stop="back" class="back" src="./back.png" alt="">
		</div>
		<div v-if="!isWeiXin" class="padding225"></div>
		<div class="cont">
			<span class="title">您不能预知未来 但您可以保障明天......</span>
			<img class="act_title_img" src="./title.png" alt="">
			<span class="act_num">(限量6万份)</span>
			<!-- 填写资料 -->
			<div class="user_info clearfix">
				<span class="suer_info_title">填资料即可领取</span>
				<div class="info_list username_list">
					<div class="input_wrapper username_wrapper">
						<div class="icon_wrapper">
							<img class="icon_user" src="./icon_user.png" alt="">
						</div>
						<input @input="setUsername" ref="username" class="username" :value="username" type="text" placeholder="中文姓名">
					</div>
					<div class="sex_wrapper">
						<div @click.stop="setSex('man')" class="sex">
							<span :class="{'select':sex=='man'}"></span>男
						</div>
						<div @click.stop="setSex('woman')" class="sex">
							<span :class="{'select':sex=='woman'}"></span>女
						</div>
					</div>
				</div>
				<div class="info_list">
					<div class="input_wrapper">
						<div class="icon_wrapper">
							<img class="icon_date" src="./icon_date.png" alt="">
						</div>
						<!-- <input @click.stop="chooseDate" id='datetime-picker' class="username" type="text" placeholder="出生日期"> -->
						<input readonly :value="birthday" ref="birthday" @focus.stop="chooseDate" id="birthday" type="text" placeholder="出生日期"/>
					</div>
				</div>
				<div class="info_list">
					<div class="input_wrapper">
						<div class="icon_wrapper">
							<img class="icon_phone" src="./icon_phone.png" alt="">
						</div>
						<input @input="setPhone" ref="phone" :value="phone" class="username" type="number" placeholder="手机号码">
					</div>
				</div>
				<div class="info_list">
					<div class="input_wrapper">
						<div class="icon_wrapper">
							<img class="icon_code" src="./icon_code.png" alt="">
						</div>
						<input @input="setCode" ref="code" class="username" :value="code" type="text" placeholder="验证码">
						<span @click="sendYzm" class="get_code">{{cutdownNum>0?cutdownNum+'s':'获取验证码'}}</span>
					</div>
				</div>
				<div class="apply_wrapper">
					<span @click.stop="apply" class="apply">立即申请</span>
				</div>
			</div>
			<!-- 提示 -->
			<div class="tip_1">*您的申请存在一定的失败几率，请保证您填写的信息真实有效</div>
			<!-- 条款 -->
			<div class="clause">
				<span @click.stop="agreeClause" :class="{'select':agreeClauseFlag}" class="check"></span>
				<div>
					同意<span class="yellow" @click.stop="goClause">《安全条款》</span>并领取免费保险
				</div>
			</div>
		</div>
		<!-- 活动规则按钮 -->
		<div @click.stop="showRule" class="rule_icon">活<br/>动<br/>规<br/>则</div>
		<!-- 隐影 -->
		<div v-show="showActRuleFlag||showQuestionFlag" @touchmove.prevent class="shadow"></div>
		<!-- 活动规则 -->
		<div v-show="showActRuleFlag" class="act_rule_wrapper clearfix">
			<span class="rule_title">活动介绍</span>
			<p class="rule_intro">参与本次活动，填写真实信息，您将有机会随机获得以下任意保险一份，每人限领取一次。</p>
			<table class="table" border="1" cellspacing="0">
				<tr class="table_head">
					<td>品牌</td>
					<td>赠险名称</td>
					<td>最高保额</td>
				</tr>
				<tr>
					<td rowspan="2">中国平安</td>
					<td>畅行天下</td>
					<td rowspan="6">100万</td>
				</tr>
				<tr>
					<td>平安驾乘人员意外伤害保险</td>
				</tr>
				<tr>
					<td>中美大都会人寿</td>
					<td>交通综合意外保障计划</td>
				</tr>
				<tr>
					<td>百年人寿</td>
					<td>《百年人寿安顺意外伤害保险》l款</td>
				</tr>
				<tr>
					<td>太平人寿</td>
					<td>太平无忧安行感谢计划</td>
				</tr>
				<tr>
					<td>阳光人寿</td>
					<td>出行无忧险</td>
				</tr>
			</table>
			<p class="rule_tip">温馨提示：具体险种以最终领取结果为准，各保险公司客服将致电回访确认免费保险生效事宜。</p>
			<img @click.stop="closeRule" class="close" src="./close.png" alt="">
		</div>
		<!-- 问卷调查 -->
		<div v-show="showQuestionFlag" @touchmove.prevent class="question_wrapper">
			<span class="question_title">感谢您的申请！</span>
			<p class="question_intro">填写问卷调查可以提高您申请成功的几率，请认真填写。</p>
			<div v-for="(item,idx) in question" class="question_list">
				<div class="question">{{item.que}}</div>
				<div class="answer">
					<span @click="setAnswer(idx,idy)" :class="{'active':item.select==idy}" v-for="(ans,idy) in item.answer">{{ans}}</span>
				</div>
				<div v-if="idx == 1" class="tip_danger">(高失败风险)</div>
			</div>
			<p class="question_tip">温馨提示：具体险种以最终领取结果为准，各保险公司客服将致电回访确认免费保险生效事宜。</p>
			<div @click="closeQuestion" class="submit">确认提交问卷</div>
			<img @click="closeQuestion" class="close" src="./close.png" alt="">
		</div>
		<!-- 弹框 -->
		<div v-show="showModalFlag" @touchmove.prevent @click="closeModal" class="modal_wrapper">
			<div @click.stop class="modal clearfix">
				<div class="modal_title">
					<span>温馨提示</span>
					<img @click.stop="closeModal" src="./close.png" alt="">
				</div>
				<div class="modal_cont">
					{{modalText}}
				</div>
			</div>
		</div>
		<!-- 加载 -->
		<div v-show="showLoadingFlag" @touchmove.prevent class="loading_wrapper">
			<div class="loading">
				<img src="./loading.gif" alt="">
			</div>
		</div>
	</div>
</template>
<script>
  	import { ajaxAsync,updateTitle,isWeiXin } from '../../assets/js/public';
  	import { Bejson } from '../../assets/js/xmltojson';
	export default{
		data(){
			return{
				sex:'man',
				agreeClauseFlag:true,//是否同意条款
				showActRuleFlag:false,//是否显示活动规则
				showQuestionFlag:false,//是否显示问卷调查
				showModalFlag:false,//是否显示对话框
				modalText:'',//对话框显示内容
				showLoadingFlag:false,//是否显示loading图标
				question:[
					{
						que:'您通常的出行方式:',
						answer:['公共交通','自驾','步行'],
						select:0
					},{
						que:'您对保险的感兴趣程度:',
						answer:['感兴趣','根据需求','不感兴趣'],
						select:0
					},{
						que:'您最关心以下哪种保障:',
						answer:['意外保障','重疾保障','医疗住院保障'],
						select:0
					}
				],
				username:'',
				birthday:'',
				phone:'',
				code:'',
				sex:'man',
				cutdownNum:0,//倒计时秒数
				phonePre:['13','14','15','18','17'],
				isWeiXin:false,//是否是微信浏览器,用来判断是否显示头部
				from:'',//渠道来源
			}
		},
		timer:null,
		methods:{
			showActRule(){//显示活动规则
				this.showActRuleFlag = true;
			},
			commitQuestion(){//提交问卷调查
				var _ques1 = this.question[0].select+1;
				var _ques2 = this.question[1].select+1;
				var _ques3 = this.question[2].select+1;
				var _this = this;
				this.$router.push({
					path:'/result',
					query:{
						name:encodeURIComponent(_this.username),
						phone:encodeURIComponent(_this.phone),
						type:encodeURIComponent(_ques1+','+_ques2+','+_ques3)
					}
				});
			},
			setUsername(){//用户名
				this.username = $.trim(this.$refs.username.value);
			},
			setPhone(){//用户手机号
				if($.trim(this.$refs.phone.value).length>0&&$.trim(this.$refs.phone.value).length<=11){
					this.phone = $.trim(this.$refs.phone.value);
				}
			},
			setCode(e){//验证码
				var _code = $.trim(this.$refs.code.value);
				if(_code.length <= 6){
					this.code = _code;
				}
			},
			setBirthday(){//设置出生日期
				this.birthday = $.trim(this.$refs.birthday.value);
			},
			apply(){//点立即申请按钮
				if(!$.trim(this.username)){
					this.showModal('请输入用户名!');
					return;
				}else{
					var reg = /^[\u4E00-\u9FA5]+$/;
					var _test = reg.test(this.username);
					if(this.username.length<2||this.username.length>6||(!_test)){
						this.showModal('请输入2-6位中文姓名');
						return;
					}
				}
				if(!this.birthday){
					this.showModal('请选择出生日期!');
					return;
				}else{
					var _diffYear = this.jsGetAge(this.birthday);
					if(_diffYear < 27 || _diffYear > 45){
						this.showModal('赠险领取用户年龄需在27-45周岁!');
						return;
					}
				}
				if(!$.trim(this.phone)){
					this.showModal('请输入手机号码!');
					return;
				}else if($.trim(this.phone).length != 11){
					this.showModal("请输入正确的手机号码!");
					return;
				}else{
					var _phonePre = this.phone.substring(0,2);
		        	if(this.phonePre.indexOf(_phonePre) == -1){
		        		this.showModal("抱歉，暂不支持此类型的手机号!");
		        		return;
		        	}
				}
				if(!$.trim(this.code)){
					this.showModal('请输入验证码!');
					return;
				}else if($.trim(this.code).length != 6){
					this.showModal("验证码错误，请重新输入!");
					return;
				}
				if(!this.agreeClauseFlag){
					this.showModal('抱歉，您需同意《安全条款》后才能申请!');
					return;
				}
				var _this = this;
				var _username = this.username;
				var _phone = this.phone;
				var _sex = this.sex == 'man' ?1:0;
				var _code = this.code;
				var _birthday = this.birthday.replace(/-/g,'');
				console.log(_username,_phone,_sex,_code,_birthday);
	        	var params = '<INF><transNo>0</transNo><action>insureReg</action><loanFlag>1</loanFlag><userName>'+_username+'</userName><loanMobile>'+_phone+'</loanMobile><birthday>'+_birthday+'</birthday><sex>'+_sex+'</sex><vcode>'+_code+'</vcode><channelId >'+(this.from?this.from:'0000')+'</channelId></INF>';
		        ajaxAsync({
		        	obj:_this,
		          	params:params,
		          	success:function(data){
		          		//console.log("data:",data);
		            	var xmlobj = Bejson.loadXml(data);
		            	var  data = Bejson.xmltojson(xmlobj);
		            	console.log("立即申请:",data);
		            	if(data.INF.rcd == '0000'){
		            		//_this.showModal('验证码已发送');
		            		_this.applySuccessFlag = true;//倒计时
		            		_this.showQuestionFlag = true;//显示问卷调查弹窗
		            	}else{
		            		_this.showModal(data.INF.rDesc);
		            	}
		          	}
		        });
			},
			setSex(_sex){//设置性别
				this.sex = _sex;
			},
			agreeClause(){//同意安全条款
				this.agreeClauseFlag = !this.agreeClauseFlag;
			},
			sendYzm(){//发送验证码
				if(this.cutdownNum != 0){
					return;
				}
				var _phone = $.trim(this.phone);
				if(!_phone){
					this.showModal('请输入手机号!');
		        }else if(_phone.length!=11){
		        	this.showModal("请输入正确的手机号");
		        }else{
		        	var _phonePre = this.phone.substring(0,2);
		        	if(this.phonePre.indexOf(_phonePre) == -1){
		        		this.showModal("抱歉，暂不支持此类型的手机号!");
		        		return;
		        	}
		        	var _this = this;
		        	var params = '<INF><transNo>0</transNo><action>insureMsgSend</action><loanFlag>1</loanFlag><loanMobile>'+_phone+'</loanMobile></INF>';
			        ajaxAsync({
			        	obj:_this,
			          	params:params,
			          	success:function(data){
			            	var xmlobj = Bejson.loadXml(data);
			            	var  data = Bejson.xmltojson(xmlobj);
			            	console.log("发送验证码:",data);
			            	if(data.INF.rcd == '0000'){
			            		_this.showModal('验证码已发送');
			            		_this.code = '';
			            		_this.cutdown();//倒计时
			            	}else{
			            		_this.showModal(data.INF.rDesc);
			            	}
			          	}
			        });
		        }
			},
			cutdown() {//倒计时
			    this.timer = null;
			    this.cutdownNum = 61;
			    this.down();
			},
			down(){
				var _this = this;
				clearTimeout(_this.timer);
				this.cutdownNum -= 1;
		      	if (this.cutdownNum > 0) {
		        	this.timer = setTimeout(function () {
		          		_this.down();
		        	}, 1000);
		      	} else {
		        	_this.cutdownNum = 0;
		      	}
			},
			back(){//返回上一页
				$("#birthday").picker("close"); //关闭弹窗
				window.history.back();
				// this.$router.back(-1)
			},
			goClause(){//跳转到安全条例页面
				this.$router.push({ path: '/clause' })
			},
			showRule(){//显示活动介绍弹窗
				this.showActRuleFlag = true;
			},
			closeRule(){//关闭活动介绍弹窗
				this.showActRuleFlag = false;
			},
			showQuestion(){//显示问卷调查弹窗
				var _ques = this.question;
				for(var key in _ques){
					_ques[key].select = 0;
				}
				this.question = _ques;
				this.showQuestionFlag = true;
			},
			closeQuestion(){//关闭问卷调查弹窗
				console.log("close question");
				this.showQuestionFlag = false;
				this.commitQuestion();
			},
			setAnswer(x,y){//点击问卷调查的选项记录下来
				var _ques = this.question;
				_ques[x].select = y;
				this.question = _ques;
			},
			chooseDate(){//点击日期选项
				var _this = this;
				// $("#datetime-picker").datetimePicker();
				// $("#birthday").datetimePicker();
				var _years = [];
				for(var i = 1970;i <= 1995;i++){
					_years.push(i);
				}
				$("#birthday").datetimePicker({
			        times: function () {
			          return [
			            {
			              values: []
			            }
			          ];
			        },
			        years:_years
			    });
				$("#birthday").on("change",()=>{
					var _birthday = _this.$refs.birthday.value.substring(0,10);
					this.birthday = _birthday;
					//console.log("change:",_this.birthday);
				});
			},
			showModal(text){//显示对话框
				this.modalText = text;
				this.showModalFlag = true;
			},
			closeModal(){//关闭对话框
				this.showModalFlag = false;
			},
		    jsGetAge(strBirthday){         
			    var returnAge;  
			    var strBirthdayArr=strBirthday.split("-");  
			    var birthYear = strBirthdayArr[0];  
			    var birthMonth = strBirthdayArr[1];  
			    var birthDay = strBirthdayArr[2]; 
			    var d = new Date();  
			    var nowYear = d.getFullYear();  
			    var nowMonth = d.getMonth() + 1;  
			    var nowDay = d.getDate(); 
			    if(nowYear == birthYear) {  
			        returnAge = 0;//同年 则为0岁  
			    }else{  
		        	var ageDiff = nowYear - birthYear ; //年之差 
		        	if(ageDiff > 0){  
			            if(nowMonth == birthMonth){  
			                var dayDiff = nowDay - birthDay;//日之差  
			                if(dayDiff < 0){  
			                    returnAge = ageDiff - 1;  
			                }else{  
			                    returnAge = ageDiff ;  
			                }  
			            }else{  
			                var monthDiff = nowMonth - birthMonth;//月之差  
			                if(monthDiff < 0) {  
			                    returnAge = ageDiff - 1;  
			                } else{  
			                    returnAge = ageDiff ;  
			                }  
			            }  
		        	} else{  
		            	returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
		        	}  
		    	}  
		    	return returnAge;//返回周岁年龄  
			},
		},
		created(){
			if(isWeiXin()){
				this.isWeiXin = true;
			}
			var _from = this.$route.query.from?this.$route.query.from:'';
			this.from = _from;
		}
	}
</script>
<style scoped lang="less">
	html,body{
		width:100%;
		background:#95b842;
	}
	#content{
		margin:0 auto;
		width:100%;
		height:34rem;
		overflow-x:hidden;
		.padding225{
			width:100%;
			height:2.25rem;
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
			z-index:1000;
			img.back{
				position:absolute;
				left:.5rem;
				top:.65rem;
				width:.5rem;
				height:.85rem;
			}
		}
		.cont{
			position:relative;
			width:100%;
			height:100%;
			background:#95b842 url('https://staticds.fuiou.com/sys/fly/img/backckground.png') no-repeat center;
			background-size:100% 100%;
			span.title{
				display:block;
				width:100%;
				height:1.75rem;
				font-size:0.75rem;
				line-height:1.75rem;
				color:#fff;
				text-indent:.25rem;
				text-shadow:1px 1px .5rem rgba(0,0,0,.6);
				text-align:left;
			}
			img.act_title_img{
				display:block;
				margin:0 auto;
				width:12.75rem;
				height:5.35rem;
			}
			span.act_num{
				display:block;
				width:100%;
				height:.95rem;
				line-height:.95rem;
				font-size:.6rem;
				color:#fff;
				text-indent:50%;
				text-align:left;
			}
			.user_info{
				margin:3rem auto 0;
				width:95%;
				background:#f4f8ea;
				border-radius:10px;
				.suer_info_title{
					padding-top:.25rem;
					display:block;
					float:left;
					width:100%;
					height:2.15rem;
					line-height:2.15rem;
					font-size:.7rem;
					color:#2c2c2b;
				}
				.info_list{
					float:left;
					padding-left:1.15rem;
					width:100%;
					height:3.05rem;
					.input_wrapper{
						float:left;
						display:flex;
						position:relative;
						width:90%;
						height:2.15rem;
						border-radius:.25rem;
						border:1px solid #e5e5e5;
						background:#fff;
						box-sizing:border-box;
						overflow:hidden;
						&.username_wrapper{
							width:50%;
							input{
								width:6.5rem;
							}
						}
						.icon_wrapper{
							float:left;
							width:2rem;
							height:2.15rem;
							img{
								margin:.5rem auto 0;
								margin-top:.5rem;
								display:block;
								width:1.15rem;
								height:1.1rem;
								&.icon_phone{
									width:.75rem;
								}
								&.icon_code{
									margin-top:.625rem;
									height:.85rem;
								}
							}
						}
						input{
							float:left;
							flex:1;
							height:2rem;
							border:0;
						}
						.get_code{
							position:absolute;
							right:0;
							top:0;
							float:left;
							width:6rem;
							height:2.15rem;
							line-height:2.15rem;
							font-size:.75rem;
							color:#43a0ff;
						}
					}
					.sex_wrapper{
						width:6rem;
						height:2.15rem;
						float:left;
						.sex{
							float:left;
							width:3rem;
							height:2.15rem;
							font-size:.75rem;
							line-height:2.15rem;
							color:#7f7f7f;
							span{
								margin:.55rem .3rem 0 .7rem;
								float:left;
								width:1.1rem;
								height:1.1rem;
								border:1px solid #e5e5e5;
								border-radius:.125rem;
								background:#fff;
								&.select{
									background:#fff url('./icon_select.png') no-repeat center;
									background-size:.95rem .95rem;
								}
							}
						}
					}
				}
				.apply_wrapper{
					float:left;
					margin-bottom:.6rem;
					width:100%;
					height:2.15rem;
					.apply{
						display:block;
						margin:0 auto;
						width:90%;
						height:2.15rem;
						border-radius:.25rem;
						background:#ff4343;
						font-size:.95rem;
						line-height:2.12rem;
						color:#fff;
					}
				}
			}
			.tip_1{
				margin:0 auto;
				padding:.6rem 0 ;
				width:94%;
				line-height:.8rem;
				font-size:.6rem;
				text-align:left;
				color:#fff;
			}
			.clause{
				margin:0 auto;
				width:17.5rem;
				height:2.2rem;
				font-size:.7rem;
				color:#fff;
				text-align:center;
				span.check{
					margin:.5rem .375rem 0 2.5rem;
					float:left;
					width:1.1rem;
					height:1.1rem;
					border-radius:5px;
					background:#fff;
					border:1px solid #e5e5e5;
					&.select{
						background:#fff url('./icon_select.png') no-repeat center;
						background-size:.95rem .95rem;
					}
				}
				div{
					float:left;
					height:2.2rem;
					line-height:2.2rem;
					span.yellow{
						color:#f6ff06;
					}
				}
			}
		}
		.rule_icon{
			position:fixed;
			right:0;
			top:3rem;
			padding:.25rem 0;
			width:1.35rem;
			background:#fdd83f;
			font-size:.68rem;
			color:#c15419;
			text-align:center;
			border-radius:.25rem 0 0 .25rem;
			z-index:600;
		}
		.loading_wrapper{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:34rem;;
			background:rgba(0,0,0,0);
			.loading{
				margin:15rem auto 0;
				width:4rem;
				height:4rem;
				background:rgba(0,0,0,.7);
				border-radius:10px;
				img{
					margin:1rem auto 0;
					width:2rem;
					height:2rem;
				}
			}
		}
		.shadow{
			position:fixed;
			left:0;
			top:0;
			right:0;
			bottom:0;
			width:100%;
			height:34rem;
			background:rgba(0,0,0,.2);
		}
		.act_rule_wrapper{
			padding-top:.5rem;
			position:absolute;
			left:50%;
			top:7rem;
			transform:translateX(-50%);
			width:94%;
			border-radius:10px;
			background:#fff;
			z-index:600;
			.rule_title{
				display:block;
				width:100%;
				height:1.4rem;
				line-height:1.4rem;
				font-size:.75rem;
				color:#c15419;
				text-align:center;
			}
			.rule_intro,.rule_tip{
				margin:0 auto;
				width:90%;
				line-height:.75rem;
				font-size:.6rem;
				color:#000;
				text-align:left;
			}
			.table{
				margin:.5rem auto 0;
				width:94%;
				height:6.75rem;
				font-size:.5rem;
				color:#555353;
				border:0;
				border-collapse :collapse ;
				tr{
					height:1rem;
					&.table_head{
						background:#ff4343;
						color:#fff;
						td{
							border-color:#ff4343;
						}
					}
					td{
						border-color:#c3c0c0;
					}
				}
			}
			.rule_tip{
				margin-top:.5rem;
				margin-bottom:.5rem;
				color:#c3c0c0;
			}
			.close{
				position:absolute;
				right:.375rem;
				top:.375rem;
				width:1.2rem;
				height:1.2rem;
				border-radius:50%;
			}
		}
		.question_wrapper{
			position:absolute;
			left:50%;
			top:7rem;
			transform:translateX(-50%);
			width:94%;
			height:17.5rem;
			border-radius:10px;
			background:#fff;
			z-index:700;
			.question_title{
				display:block;
				width:100%;
				height:1.6rem;
				line-height:1.6rem;
				font-size:.75rem;
				color:#ff4343;
				text-align:center;
			}
			.question_intro,.question_tip{
				margin:0 auto;
				width:94%;
				line-height:.75rem;
				font-size:.6rem;
				color:#a9a9a9;
				text-align:left;
			}
			.question_list{
				padding:0 3%;
				width:100%;
				height:3.5rem;
				box-sizing:border-box;
				.question{
					width:100%;
					height:1.6rem;
					line-height:1.6rem;
					font-size:.6rem;
					color:#2a2929;
					text-align:left;
				}
				.answer{
					width:100%;
					display:flex;
					justify-content:space-between;
					span{
						float:left;
						border:1px solid #e5e5e5;
						height:1.5rem;
						width:4.4rem;
						box-sizing:border-box;
						color:#a9a9a9;
						text-align:center;
						font-size:.7rem;
						line-height:1.5rem;
						border-radius:5px;
						&.active{
							background:#ff4343;
							color:#fff;
							border:1px solid #ff4343;
						}
					}
				}
				.tip_danger{
					float:right;
					width:4.4rem;
					height:1rem;
					line-height:1rem;
					font-size:.5rem;
					color:#c3c0c0;
					text-align:center;
				}
			}
			.submit{
				margin:.5rem auto 0;
				width:8.85rem;
				height:1.75rem;
				background:#ff4343;
				line-height:1.75rem;
				text-align:center;
				border-radius:5px;
				color:#fff;
				font-size:.9rem;
			}
			.close{
				position:absolute;
				right:.38rem;
				top:.38rem;
				width:1.2rem;
				height:1.2rem;
				border-radius:50%;
			}
		}
		.modal_wrapper{
			position:absolute;
			left:0;
			top:0;
			right:0;
			bottom:0;
			width:100%;
			height:34rem;
			background:rgba(0,0,0,.5);
			z-index:700;
			.modal{
				margin:10rem auto 0;
				width:90%;
				background:#fff;
				border-radius:5px;
				.modal_title{
					float:left;
					width:100%;
					height:2rem;
					background:#f6f6f6;
					font-size:.75rem;
					line-height:2rem;
					text-indent:10px;
					color:#43a9ff;
					text-align:left;
					border-radius:5px 5px 0 0;
					img{
						float:right;
						margin-right:.375rem;
						margin-top:.375rem;
						width:1.2rem;
						height:1.2rem;
					}
				}
				.modal_cont{
					float:left;
					padding:1rem 0 1rem 5%;
					width:90%;
					line-height:1rem;
					font-size:.7rem;
					color:#3c3d3e;
					text-align:left;
				}
			}
		}
	}
</style>