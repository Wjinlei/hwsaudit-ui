<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="~@/assets/logo.svg" class="logo" alt="logo" />
              <span class="title">{{ $t('home.header.title') }}</span>
            </a>
          </div>
          <div class="desc">
            {{ $t('home.header.os') }}
          </div>
        </div>

        <a-row type="flex" justify="center" :gutter="[0, 16]">
          <a-col>
            <a-card :title="$t('home.content.audit.setting')" style="width: 1300px">
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  :label="$t('home.content.form.path.label')"
                  :labelCol="{ span: 2 }"
                  :wrapperCol="{ span: 21 }"
                >
                  <a-input
                    v-decorator="[
                      'path',
                      { rules: [{ required: true, message: $t('home.content.form.path.required') }] }
                    ]"
                    name="path"
                    :placeholder="$t('home.content.form.path.placeholder')"
                  />
                </a-form-item>

                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      :label="$t('home.content.form.owner.label')"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 15 }"
                    >
                      <a-input
                        v-decorator="['owner']"
                        name="owner"
                        :placeholder="$t('home.content.form.owner.placeholder')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :label="$t('home.content.form.acl.label')"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 18 }"
                    >
                      <a-input
                        v-decorator="['acl']"
                        name="acl"
                        :placeholder="$t('home.content.form.acl.placeholder')"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      :label="$t('home.content.form.ugo.label')"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 15 }"
                    >
                      <a-input
                        v-decorator="['ugo']"
                        name="ugo"
                        :placeholder="$t('home.content.form.ugo.placeholder')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :label="$t('home.content.form.other.label')"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 18 }"
                    >
                      <a-row type="flex" justify="space-between">
                        <a-checkbox v-decorator="['t']"> {{ $t('home.content.form.t') }} </a-checkbox>
                        <a-checkbox v-decorator="['s']"> {{ $t('home.content.form.s') }} </a-checkbox>
                        <a-checkbox v-decorator="['chkfile']"> {{ $t('home.content.form.chkfile') }} </a-checkbox>
                        <a-checkbox v-decorator="['chkdir']"> {{ $t('home.content.form.chkdirectory') }} </a-checkbox>
                      </a-row>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item :wrapperCol="{ span: 24, offset: 2 }">
                  <a-button size="large" icon="search" htmlType="submit" type="primary">{{
                    $t('home.content.form.submit')
                  }}</a-button>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col>
            <a-card :title="$t('home.content.audit.result')" style="width: 1300px">
              <a-table :columns="columns" :data-source="data" />
            </a-card>
          </a-col>
        </a-row>

        <div class="footer">
          <div class="copyright">{{ $t('home.copyright') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'UserLayout',
  components: {
    SelectLang
  },
  mixins: [deviceMixin],
  mounted () {
    document.body.classList.add('userLayout')
  },
  computed: {
    columns () {
      return [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: this.$t('home.table.name'),
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: this.$t('home.table.path'),
          dataIndex: 'path',
          key: 'path'
        },
        {
          title: this.$t('home.table.user'),
          dataIndex: 'user',
          key: 'user'
        },
        {
          title: this.$t('home.table.mode'),
          dataIndex: 'mode',
          key: 'mode'
        },
        {
          title: this.$t('home.table.acl'),
          dataIndex: 'acl',
          key: 'acl'
        }
      ]
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      data: []
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .user-layout-content {
      padding: 32px 0 24px;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
