<script setup>
const json = {
  "splenwiseLocalPortConfDoc": [
    {
      "reportInfo": [
        {
          "reportName": "梁乐欣",
          "sdate": "2024-08-09"
        }
      ]
    },
    {
      "servicePortConfig": [
        {
          "svrName": "18167",
          "svrIPAddr": "127.0.0.1",
          "svrPort": "18167",
          "srlID": "Splenwise工作管理平台",
          "compName": "工作管理服务组件",
          "attr128LenValue1": "",
          "attr128LenValue2": "",
          "attr128LenValue3": "Splenwise数据资产管理系统",
          "attr128LenValue4": "",
          "attr128LenValue5": "第三方工作管理平台服务系统",
          "attr128LenValue6": "",
          "exeName": "3rdPartyWorkPlatformSvr",
          "svrSrlID": "",
          "svrCompName": "",
          "refPackName": "4位资源标识的Splenwise配置管理协议",
          "maxConnNum": "1000",
          "isSpierPack": "否",
          "maxIdleTime": "1800",
          "maxPreListeners": "8",
          "timeout": "3",
          "status": "测试",
          "objectID": "0005-20230908154026-00145122-0046",
          "remark": "",
          "servicePortAccessAuth": [
            {
              "ipAddr": "*",
              "remark": ""
            }
          ],
          "communiProtocolConfig": [
            {
              "protocolName": "4位资源标识的Splenwise配置管理协议",
              "packCoding": "报文采用ascii编码",
              "lenFldMethod": "2字节二进制",
              "lenOfMsgHeader": "0",
              "msgHeaderMethod": "",
              "isOneDirectionPack": "否",
              "remark": "",
              "protocolMessageConfig": [
                {
                  "lenOfDirection": "1",
                  "lenOfTellerNo": "30",
                  "lenOfResID": "4",
                  "lenOfCmdID": "3",
                  "lenOfErrCode": "6",
                  "lenOfDataLen": "4",
                  "remark": ""
                }
              ]
            }
          ],
          "startTasks": [
            {
              "taskName": "3rdPartyWorkPlatformSvr 18167",
              "applicationName": "3rdPartyWorkPlatformSvr 18167",
              "minTaskNum": "0",
              "logFileName": "3rdPartyWorkPlatformSvr-18167",
              "applyServiceList": "",
              "remark": ""
            },
            {
              "taskName": "3rdPartyWorkPlatformSvr task 18167",
              "applicationName": "null",
              "minTaskNum": "0",
              "logFileName": "3rdPartyWorkPlatformSvr-18167",
              "applyServiceList": "",
              "remark": ""
            }
          ],
          "runningLogs": [
            {
              "logName": "3rdPartyWorkPlatformSvr-18167",
              "logLevel": "审计级",
              "maxSize": "10",
              "writeAttr": "不带时间戳",
              "backupNeededBeforeOverwrite": "覆盖写",
              "isFileNameWithPID": "否",
              "remark": ""
            }
          ],
          "safeAuthConfig": [],
          "keyManageCipherMachine": [],
          "keyServiceBus": []
        }
      ]
    }
  ]
}

const checkedKeys = ref([]);
const checkedStrategy = ref('all');
const treeData = [
  {
    title: 'servicePortConfig',
    key: 'servicePortConfig',
    children: [
      {
        title: 'svrName',
        key: 'svrName',
        children: []
      },
      {
        title: 'servicePortAccessAuth',
        key: 'servicePortAccessAuth',
        children: [
          {
            title: '0',
            key: '0',
            children: [
              {
                title: 'ipAddr',
                key: 'ipAddr',
                children: []
              },
              {
                title: 'remark',
                key: 'remark',
                children: []
              }
            ]
          }
        ]
      },
    ],
  },
];

const strategyOptions = [
  {
    value: 'all',
    label: 'show all'
  },
  {
    value: 'parent',
    label: 'show parent'
  },
  {
    value: 'child',
    label: 'show child'
  }
];

function getTreeData(json) {
  const result = []
  const data = json.splenwiseLocalPortConfDoc[1].servicePortConfig[0]
  const keyTopName = 'splenwiseLocalPortConfDoc[1].servicePortConfig[0].'
  for (const key in data) {
    const value = data[key]
    if (Array.isArray(value)) {
      const children = []
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        const child = {
          title: i.toString(),
          key: keyTopName + key + '[' + i + ']',
          children: []
        }
        for (const k in item) {
          const v = item[k]
          child.children.push({
            title: k,
            key: keyTopName + key + '[' + i + '].' + k,
            children: []
          })
        }
        children.push(child)
      }
      result.push({
        title: key,
        key: keyTopName + key,
        children
      })
    } else {
      result.push({
        title: key,
        key: keyTopName + key,
        children: []
      })
    }
  }
  return result
}

const treeData2 = getTreeData(json)
console.log(treeData2)

</script>
<template>
  <div>
    <a-radio-group type='button' v-model="checkedStrategy" @change="(value) => {
      checkedKeys = []
    }">
      <a-radio v-for="item in strategyOptions" :key="item?.value" :value="item?.value">
        {{ item?.label }}
      </a-radio>
    </a-radio-group>
    <br />
    <a-typography-text style="margin: 24px 0; display: inline-block;">
      Current: {{ checkedKeys?.join(' , ') }}
    </a-typography-text>
    <br />
    <a-tree :checkable="true" v-model:checked-keys="checkedKeys" :checked-strategy="checkedStrategy"
      :data="treeData2" />
  </div>
</template>

<style scoped></style>
